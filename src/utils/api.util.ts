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

export function isValidRequestMethod(
  req: NextApiRequest,
  allowedMethods: Set<HttpMethods>
) {
  return allowedMethods.has(req.method as HttpMethods);
}

export function validateRequestHeaders(
  req: NextApiRequest,
  requiredHeaders: string[]
) {
  const missingHeaders = requiredHeaders.filter(
    (header) => !(header in req.headers)
  );

  return {
    hasValidHeaders: missingHeaders.length === 0,
    missingHeaders,
  };
}

export function validateRequestBody(req: NextApiRequest, fields: string[]) {
  const missingFields = fields.filter((field) => !(field in req.body));

  return {
    hasValidBody: missingFields.length === 0,
    missingFields,
  };
}

export function validateRequiredFields(
  req: NextApiRequest,
  requiredFields: string[]
) {
  const missingRequiredFields = requiredFields.filter(
    (field) => req.body[field] === ""
  );

  return {
    hasRequiredFields: missingRequiredFields.length === 0,
    missingRequiredFields,
  };
}

export function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    email
  );
}
