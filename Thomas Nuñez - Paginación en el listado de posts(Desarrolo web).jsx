import React, { useState, useEffect } from "react";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?_page=${page}&_limit=5`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [page]);

  return (
    <div>
      <h2>Listado de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.content}
          </li>
        ))}
      </ul>

      {/* Botones de paginación */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)}>Siguiente</button>
    </div>
  );
}

export default PostsList;