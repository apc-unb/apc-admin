import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core'

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
    // const data = [
    //   {
    //     professorfirstname,
    //     professorlastname,     
    //     classname,           
    //     address,             
    //     year,                 
    //     season,                
    //   }
    // ]
    // try{
    //   const res = await api.post('/classes', data)
    //   console.log(res.status)
    // } catch(err){
    //   console.error(err)
    // }
  }

  function handleEdit(id) {

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
      <Button variant="contained" raised="true" color="primary" onClick={()=>handleAdd()}>
        Adicionar
      </Button>
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
          <Button size="small" color="primary" onClick={() => handleEdit(c.ID)}>
            Editar
          </Button>
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

