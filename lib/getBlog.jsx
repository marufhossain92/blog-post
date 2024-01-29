export default async function getBlog(blogId) {
  const res = await fetch(`http://127.0.0.1:3007/api/v1.0/blogs/${blogId}`);

  if (!res.ok) throw new Error("Failed to fetch blog");

  return res.json();
}
