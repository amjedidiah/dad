import { NextApiRequest } from "next";
import { Api } from "zerobounce";
import validate from "deep-email-validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { UserData } from "@/redux/slices/user.slice";

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

function isValidRequestMethod(
  req: NextApiRequest,
  allowedMethods: Set<HttpMethods>
) {
  const isValidMethod = allowedMethods.has(req.method as HttpMethods);
  const allowedMethodSize = allowedMethods.size;

  if (!isValidMethod)
    throw {
      statusCode: HttpStatus.METHOD_NOT_ALLOWED,
      message: "An error occurred",
      devMessage: `Only ${Array.from(allowedMethods).join(", ")} method${
        allowedMethodSize > 1 ? "s" : ""
      } ${allowedMethodSize > 1 ? "are" : "is"} allowed`,
      data: null,
    };
}

function validateRequestParams(
  req: NextApiRequest,
  param: string,
  requiredArray: string[]
) {
  const missingRequiredParamFields = requiredArray.filter((field) =>
    param === "query" || param === "headers"
      ? !(field in req[param])
      : !req.body[field]
  );
  const message = (
    {
      query: "Required query params are missing",
      body: "Required fields are missing",
      headers: "An error occurred",
    } as { [param: string]: string }
  )[param];
  const devMessage =
    param === "headers" ? "Required request headers are missing" : message;

  if (missingRequiredParamFields.length !== 0)
    throw {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      devMessage,
      data: missingRequiredParamFields,
    };
}

export function validateRequest(
  req: NextApiRequest,
  {
    methods,
    requiredHeaders,
    requiredFields,
    requiredParams,
  }: {
    methods: Set<HttpMethods>;
    requiredHeaders?: string[];
    requiredFields?: string[];
    requiredParams?: string[];
  }
) {
  isValidRequestMethod(req, methods);
  if (requiredHeaders) validateRequestParams(req, "headers", requiredHeaders);
  if (requiredParams) validateRequestParams(req, "query", requiredParams);
  if (requiredFields) validateRequestParams(req, "body", requiredFields);
}

export async function validateEmail(email: string) {
  if (!email) return false;
  try {
    const isValidByRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email
      );
    if (!isValidByRegex) return false;

    const isValidByDeepValidator = validate({
      email,
      validateRegex: true,
      validateMx: true,
      validateTypo: false,
      validateDisposable: true,
      validateSMTP: true,
    });
    if (!isValidByDeepValidator) return false;
    if (process.env.NODE_ENV === "development") return true;

    const api = new Api(process.env.ZEROBOUNCE_API_KEY as string);
    const response = await api.validate(email);

    console.info({ success: response.success, error: response.error });
    return response.isSuccess();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function validatePhone(phone: string) {
  if (!phone) return false;

  const isValid = isValidPhoneNumber(phone);
  if (!isValid) return false;

  if (process.env.NODE_ENV === "development") return true;

  try {
    const response = await fetch(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&phone=${phone}`
    );
    const { valid } = await response.json();
    return valid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function validateImage(imageUrl: string) {
  if (!imageUrl) return false;

  return fetch(imageUrl, {
    method: "HEAD",
  })
    .then(() => true)
    .catch(() => false);
}

export async function validateUserData({
  email,
  name,
  imageUrl,
  phoneNumber,
}: UserData) {
  const isValidEmail = await validateEmail(email);

  switch (true) {
    case !isValidEmail:
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Email is invalid",
        devMessage: "Email is invalid",
        data: email,
      };
    case name && name.length < 3:
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Name must be at least 3 characters",
        devMessage: "Name must be at least 3 characters",
        data: name,
      };
    case Boolean(imageUrl):
      const isValidImage = await validateImage(imageUrl as string);
      if (!isValidImage)
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Image is invalid",
          devMessage: "Image is invalid",
          data: imageUrl,
        };
      break;
    case Boolean(phoneNumber):
      const isValidPhoneNumber = await validatePhone(phoneNumber as string);
      if (!isValidPhoneNumber)
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Image is invalid",
          devMessage: "Image is invalid",
          data: imageUrl,
        };
      break;
    default:
      break;
  }
}
