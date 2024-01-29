export default async function getAllBlogs() {
  const res = await fetch(`http://127.0.0.1:3007/api/v1.0/blogs`);

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}
