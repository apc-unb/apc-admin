import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Popup from "reactjs-popup"

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

function SchoolClass() {
  
  const [classes, setClasses] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await api.get('/classes')

      setClasses(response.data)
    }
    getData()

  }, [classes])
  
  async function handleAdd() {

  }

  async function handleEdit(event) {
    
  }

  async function handleDelete(id) {
    if(window.confirm("Deseja mesmo deletar esta?")) {
      try {
        const res = await api.delete(`/classes`, { data: [ {"id": id } ] } )
        console.log(res.status)
      } catch(err) {
        console.error(err)
      }
    }
  }


  return (
    <div className="schoolClass-page">
      <h1>Turmas de APC</h1>
      <br/>
      {/* ADD BUTTON POPUP */}
      <Popup trigger={
            <Button variant="contained" raised="true" color="primary" onClick={()=>handleAdd()}>
            Adicionar
            </Button>
          } position="right center">
            <div>Popup content here !!</div>
          </Popup>
      {/* END OF ADD BUTTON POPUP */}
      <br/><br/>
      {classes.map( c => (
      <div key={c.ID}>
        <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { c.classname } - { c.year }/{ c.season }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Professor(a): {c.professorfirstname} {c.professorlastname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Local: { c.address }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* EDIT BUTTON POPUP */}
          <Popup trigger={
            <Button size="small" color="primary">
              Editar
            </Button>
          } position="right center" modal>
            {close => (
              <div className="modal">
              <Button size="small" color="primary" onClick={close}><CloseIcon /></Button>
              <form onSubmit={() => handleEdit()}>
              <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                <TextField
                  id="standard-name"
                  name="classname"
                  label="Turma"
                  className={classes.textField}
                  value={c.classname}
                  margin="normal"
                />
                <TextField
                  id="year"
                  label="Ano"
                  className={classes.textField}
                  value={c.year}
                  margin="normal"
                />
                <TextField
                  id="season"
                  label="Período"
                  className={classes.textField}
                  value={c.season}
                  margin="normal"
                />
                <TextField
                  id="professorfirstname"
                  label="Nome do professor"
                  className={classes.textField}
                  value={c.professorfirstname}
                  margin="normal"
                />
                <TextField
                  id="professorlastname"
                  label="Sobrenome do professor"
                  className={classes.textField}
                  value={c.professorlastname}
                  margin="normal"
                />
                <TextField
                  id="address"
                  label="Local"
                  className={classes.textField}
                  value={c.address}
                  margin="normal"
                />
                </CardContent>
              </CardActionArea>
              </Card>
              <br/>
              <Button variant="contained" size="small" color="primary" onClick={close}>
                Editar
              </Button>
              </form>
              </div>
            )}
          </Popup>
          {/* END OF EDIT BUTTON POPUP */}
          <Button size="small" color="primary" onClick={() => handleDelete(c.ID)}>
            Deletar
          </Button>
        </CardActions>
      </Card>
      <br/>
    </div>
    ))}
    </div>
  );
}

export default SchoolClass

