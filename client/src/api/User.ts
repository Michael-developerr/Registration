import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export function registration(data: {
  username: string;
  email: string;
  password: string;
}): Promise<void> {
  return fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => undefined);
}
export default registration;

export async function validateResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}
export function login(data: {
  email: string;
  password: string;
}): Promise<void> {
  return fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(validateResponse)
    .then(() => undefined);
}
export function fetchme(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then((response) => response.json())

    .then((data) => UserSchema.parse(data));
}

export function logout(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(validateResponse)
    .then(() => undefined);
}


export function PostNotes(data: {
  title: string;
  text: string;
}): Promise<void> {
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(validateResponse)
    .then(() => undefined);
}
