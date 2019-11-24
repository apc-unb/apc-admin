import React, { useState } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";
import { makeStyles } from "@material-ui/core/styles";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

function EditNews({ news }) {
  const classes = useStyles();
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
    <form onSubmit={handleSubmit} className={classes.root}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item sm={1}>
          <TitleIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Título"
            type="text"
            value={title}
            fullWidth
            onChange={event => setTitle(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems="center" justify="center">
        <Grid item sm={1}>
          <DescriptionIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Descrição"
            type="text"
            value={description}
            fullWidth
            multiline
            rows="6"
            variant="outlined"
            onChange={event => setDescription(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems="center" justify="center">
        <Grid item sm={1}>
          <LocalOfferIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Tags"
            type="text"
            fullWidth
            variant="filled"
            onKeyUp={event => addTags(event)}
            placeholder="Precione enter para adicionar"
          />
        </Grid>
        <button hidden onClick={addTags}>
          +
        </button>
      </Grid>
      <br />
      {tags.map((t, index) => (
        <Chip
          key={index}
          label={t}
          variant="outlined"
          color="primary"
          className={classes.chip}
          onDelete={event => removeTags(index, event)}
        />
      ))}
      <Grid container justify="center">
        <Popup
          trigger={
            <Grid item xs={12} sm={10} md={6} lg={3}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SendIcon />}
              >
                Enviar
              </Button>
            </Grid>
          }
          modal
          contentStyle={{
            borderRadius: "25px",
            borderWidth: "20px 20px 20px 20px",
            borderColor: "white",
            maxWidth: "300px"
          }}
        >
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </Grid>
    </form>
  );
}

export default EditNews;
