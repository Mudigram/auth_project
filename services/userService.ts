export interface User {
  id?: number;
  name: string;
  email: string;
}

const API_URL = "http://localhost:5001/users";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createUser(user: User): Promise<User> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id: number, user: User): Promise<User> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
