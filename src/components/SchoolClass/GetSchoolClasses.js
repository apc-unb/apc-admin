import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function GetSchoolClasses() {
  const style = useStyles();
  var admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get("/class/" + admin_data.admin.ID);
      setClasses(response.data);
    }
    getData();
  }, [admin_data.admin.ID]);

  async function handleClick(sclass) {
    admin_data.class = sclass;
    sessionStorage.setItem("admin", JSON.stringify(admin_data));
    window.location.href = "/";
  }

  return (
    <>
      {classes.map(c => (
        <ListItem
          button
          className={style.nested}
          onClick={() => handleClick(c)}
        >
          <ListItemText
            primary={c.classname + " - " + c.year + "/" + c.season}
          />
        </ListItem>
      ))}
    </>
  );
}

export default GetSchoolClasses;
