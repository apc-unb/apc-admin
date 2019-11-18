import React, { useState } from "react";
import api from "../../services/api.js";

function CreateNews() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  async function handleSubmit(event) {
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
        const obj = {
          classid: admin_data.class.ID,
          title,
          description,
          tags
        };

        await api.post("/news", obj);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function addTags(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  }
  function removeTags(index) {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
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
        <input
          type="text"
          onKeyUp={event => addTags(event)}
          placeholder="Precione enter para adicionar uma tag"
        />
        <button hidden onClick={addTags}>
          +
        </button>
        <ul>
          {tags.map((t, index) => (
            <li key={index}>
              <span>{t} </span>
              <button onClick={() => removeTags(index)}>X</button>
            </li>
          ))}
        </ul>

        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CreateNews;
