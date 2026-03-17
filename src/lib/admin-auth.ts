import crypto from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
  };
}

export function getBasicAuthCredentials() {
  return {
    username: process.env.BASIC_AUTH_USERNAME ?? "shield",
    password: process.env.BASIC_AUTH_PASSWORD ?? "shield123",
  };
}

function getSessionSignature(username: string, password: string) {
  return crypto
    .createHash("sha256")
    .update(`${username}:${password}:local-admin`)
    .digest("hex");
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function validateCredentials(username: string, password: string) {
  const expected = getAdminCredentials();
  return username === expected.username && password === expected.password;
}

export function validateBasicAuth(username: string, password: string) {
  const expected = getBasicAuthCredentials();
  return username === expected.username && password === expected.password;
}

export function createSessionToken() {
  const creds = getAdminCredentials();
  return getSessionSignature(creds.username, creds.password);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === createSessionToken();
}
