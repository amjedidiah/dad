import { NextApiRequest } from "next";

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

function validateRequestBody(req: NextApiRequest, fields: string[]) {
  const missingFields = fields.filter((field) => !(field in req.body));
  const hasValidBody = missingFields.length === 0;

  if (!hasValidBody)
    throw {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "An error occurred",
      devMessage: "Required request body fields are missing",
      data: missingFields,
    };
}

function validateRequiredFields(req: NextApiRequest, requiredFields: string[]) {
  const missingRequiredFields = requiredFields.filter(
    (field) => req.body[field] === ""
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

export function validateRequest(
  req: NextApiRequest,
  {
    methods,
    requiredHeaders,
    requiredBodyFields,
    requiredFields,
  }: {
    methods: Set<HttpMethods>;
    requiredHeaders?: string[];
    requiredBodyFields: string[];
    requiredFields: string[];
  }
) {
  isValidRequestMethod(req, methods);
  if (requiredHeaders) validateRequestHeaders(req, requiredHeaders);
  validateRequestBody(req, requiredBodyFields);
  validateRequiredFields(req, requiredFields);
}

export function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    email
  );
}
