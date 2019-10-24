import React, { useState } from "react";
import api from "../../services/api.js";

function CreateNews() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([""]);

  async function handleSubmit() {
    tags.shift();

    if (
      window.confirm(
        "Deseja mesmo criar esta notícia?\n\n" +
          "Título: \n" +
          title +
          " \n\n" +
          "Descrição: \n" +
          description +
          " \n\n" +
          "Tags: \n" +
          "[ " +
          tags.map(t => t) +
          " ]"
      )
    ) {
      try {
        const arr = [];
        arr.push({
          classid: admin_data.class.ID,
          title,
          description,
          tags
        });
        await api.post("/news", arr);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function newTag(event) {
    event.preventDefault();
    let tag = document.getElementById("tags");
    setTags([...tags, tag.value]);
    tag.value = "";
  }

  return (
    <div className="CreateNews">
      <h2>Enviar Notícia</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título: </label>
        <input
          id="title"
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Descrição: </label>
        <textarea
          id="description"
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}
          required
        />
        <br />
        <label htmlFor="tags">Tags: </label>
        <input type="text" id="tags" type="text" placeholder="Tag" />
        {tags.map((t, index) => (
          <span key={index}>{t} / </span>
        ))}

        <button onClick={newTag}>+</button>

        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CreateNews;
