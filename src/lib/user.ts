export async function getUser() {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return await res.json();
}