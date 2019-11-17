import React, { useState } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";

function EditNews({ news }) {
  const classid = JSON.parse(sessionStorage.getItem("admin")).class.ID;
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [tags, setTags] = useState(news.tags);

  async function handleSubmit() {
    try {
      const obj = {
        id: news.ID,
        classid,
        title,
        description,
        tags
      };

      await api.put("/news", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  function addTags(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  }
  function removeTags(index, event) {
    event.preventDefault();
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  }

  return (
    <div className="EditNews">
      <h2>Editar Notícia </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título: </label>
        <input
          id="etitle"
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Descrição: </label>
        <textarea
          id="edescription"
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)}
          required
        />
        <br />
        <label htmlFor="tags">Tags: </label>
        <input
          autoComplete="new-password"
          type="text"
          name="tag"
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
              <button onClick={event => removeTags(index, event)}>X</button>
            </li>
          ))}
        </ul>

        <Popup trigger={<button type="button"> Enviar </button>}>
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </form>
    </div>
  );
}

export default EditNews;
