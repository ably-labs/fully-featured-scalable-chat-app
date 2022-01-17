import * as Validator from "validatorjs";
import * as crypto from "crypto";

export function ok(reason = "", responseObject: any = {}, headers = {}) {
  const bodyObj = { success: true, reason, ...responseObject };
  return { status: 200, body: JSON.stringify(bodyObj), headers: headers };
}

export function badRequest(validation: Validator) {
  return { status: 400, body: JSON.stringify(validation.errors.all()) };
}

export function badRequestFor(responseObject: any) {
  return { status: 400, body: JSON.stringify(responseObject) };
}

export function forbidden(reason = "") {
  return { status: 403, body: JSON.stringify({ success: false, reason }) };
}

export function notModified() {
  return { status: 304, body: "Not Modified" };
}

export function notFound(reason = "") {
  return { status: 404, body: reason };
}

export function etagFor(obj: any): string {
  const json = JSON.stringify(obj);
  const hash = crypto.createHash("sha1");
  hash.update(json);
  return `"${hash.digest("base64")}"`;
}

export function etagMatches(obj: any, etag: string): boolean {
  if (!etag) {
    return false;
  }

  return etagFor(obj) === etag;
}
