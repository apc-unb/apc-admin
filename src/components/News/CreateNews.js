import React, { useState } from "react";
import api from "../../services/api.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

function CreateNews() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
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
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Enviar notícias
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          sm={12}
        >
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
        <Grid container alignItems="center" justify="center" sm={12}>
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
        <Grid container alignItems="center" justify="center" sm={12}>
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
            onDelete={() => removeTags(index)}
          />
        ))}
        <Grid container justify="center">
          <Button
            color="primary"
            variant="contained"
            startIcon={<SendIcon />}
            type="submit"
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default CreateNews;
