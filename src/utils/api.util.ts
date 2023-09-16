import { NextApiRequest } from "next";
import { Api } from "zerobounce";
import validate from "deep-email-validator";
import { isValidPhoneNumber } from "react-phone-number-input";

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

function validateRequestHeaders(
  req: NextApiRequest,
  requiredHeaders: string[]
) {
  const missingHeaders = requiredHeaders.filter(
    (header) => !(header in req.headers)
  );
  const hasValidHeaders = missingHeaders.length === 0;

  if (!hasValidHeaders)
    throw {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "An error occurred",
      devMessage: "Required request headers are missing",
      data: missingHeaders,
    };
}

function validateRequiredFields(req: NextApiRequest, requiredFields: string[]) {
  const missingRequiredFields = requiredFields.filter(
    (field) => !req.body[field]
  );
  const hasRequiredFields = missingRequiredFields.length === 0;

  if (!hasRequiredFields)
    throw {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Required fields are missing",
      devMessage: "Required fields are missing",
      data: missingRequiredFields,
    };
}

function validateQueryParams(req: NextApiRequest, requiredParams: string[]) {
  const missingRequiredParams = requiredParams.filter(
    (param) => !(param in req.query)
  );
  const hasRequiredParams = missingRequiredParams.length === 0;

  if (!hasRequiredParams)
    throw {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Required query params are missing",
      devMessage: "Required query params are missing",
      data: missingRequiredParams,
    };
}

export function validateRequest(
  req: NextApiRequest,
  {
    methods,
    requiredHeaders,
    requiredBodyFields,
    requiredFields,
    requiredParams,
  }: {
    methods: Set<HttpMethods>;
    requiredHeaders?: string[];
    requiredBodyFields?: string[];
    requiredFields?: string[];
    requiredParams?: string[];
  }
) {
  isValidRequestMethod(req, methods);
  if (requiredHeaders) validateRequestHeaders(req, requiredHeaders);
  if (requiredParams) validateQueryParams(req, requiredParams);
  if (requiredFields) validateRequiredFields(req, requiredFields);
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
