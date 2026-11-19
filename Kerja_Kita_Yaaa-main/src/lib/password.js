import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt:${salt}:${Buffer.from(derivedKey).toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== "string") return false;
  const [algorithm, salt, expectedHex] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, "hex");
  const actual = Buffer.from(await scrypt(password, salt, KEY_LENGTH));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
