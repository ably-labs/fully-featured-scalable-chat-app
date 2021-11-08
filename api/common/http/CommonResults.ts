import * as Validator from "validatorjs";

export function ok(reason: string = "", responseObject: any = {}) {
  const bodyObj = { success: true, reason, ...responseObject };
  return { status: 200, body: JSON.stringify(bodyObj) };
}

export function badRequest(validation: Validator) {
  return { status: 400, body: JSON.stringify(validation.errors.all()) };
}

export function badRequestFor(responseObject: any) {
  return { status: 400, body: JSON.stringify(responseObject) };
}

export function forbidden(reason: string = "") {
  return { status: 403, body: JSON.stringify({ success: false, reason }) };
}
