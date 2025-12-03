import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!title.trim() || !content.trim()) {
      setMessage("⚠️ Debes llenar todos los campos.");
      return;
    }

    // Envío al JSON Server
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    // Limpiar campos
    setTitle("");
    setContent("");

    // Mensaje y redirección
    setMessage("✅ Post creado correctamente.");
    setTimeout(() => navigate("/posts"), 2000);
  };

  return (
    <div>
      <h2>Crear nuevo Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {/* Link para regresar */}
      <button onClick={() => navigate("/posts")}>Volver al listado</button>

      {/* Mensaje */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default NewPost;