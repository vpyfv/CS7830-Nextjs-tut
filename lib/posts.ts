export interface Post {
  title: string;
  body: string;
  id: number;
}

export async function getPosts() {
  return fetch("/api/load", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((list) => list.posts)
    .catch((err) => console.log(err));
}

export async function getPost(postId: string) {
  return fetch(`/api/load/${postId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.post)
    .catch((err) => console.error(err));
}
