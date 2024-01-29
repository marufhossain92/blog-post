export default async function getComments(commentId) {
  const res = await fetch(
    `http://127.0.0.1:3007/api/v1.0/comments?postId=${commentId}`
  );

  if (!res.ok) throw new Error("Failed to fetch comments");

  return res.json();
}
