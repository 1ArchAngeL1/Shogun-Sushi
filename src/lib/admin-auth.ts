import "server-only";
import { cookies } from "next/headers";

/**
 * Minimal hard-coded admin authentication.
 *
 * As requested, credentials are baked in. On successful login we set an
 * httpOnly session cookie holding a fixed token; protected pages and API
 * routes check that the cookie matches.
 *
 * NOTE: this is intentionally simple (single hard-coded operator). It is not
 * meant to withstand a determined attacker — keep the admin URL private.
 */

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "TestPass123";

export const SESSION_COOKIE = "shogun_admin_session";
// Opaque value stored in the cookie. Knowing the username/password is what
// grants access; the token just marks an already-authenticated session.
const SESSION_TOKEN = "shogun-admin-ok.v1";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/** Set the session cookie (call from a Route Handler / Server Function). */
export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Clear the session cookie. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** Whether the current request carries a valid admin session. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === SESSION_TOKEN;
}
