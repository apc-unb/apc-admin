import React, { useState } from 'react';
import api from '../../services/api.js';


function EditProfile() {
    var admin_data = JSON.parse(sessionStorage.getItem('admin'))
    const [firstname, setFirstname] = useState(admin_data.admin.firstname)
    const [lastname, setLastname] = useState(admin_data.admin.lastname)
    const [email, setEmail] = useState(admin_data.admin.email)
    const [photourl, setPhotourl] = useState(admin_data.admin.photourl)
    const [matricula, setMatricula] = useState(admin_data.admin.matricula)

    async function handleSubmit(event) {
        event.preventDefault()
        if(window.confirm("Deseja mesmo editar?")){
            try {
                const arr = [
                    {
                        "id": admin_data.admin.ID,
                        email,
                        photourl
                    }
                ]
                admin_data.admin.email = email
                admin_data.admin.photourl = photourl
                sessionStorage.setItem("admin", JSON.stringify(admin_data))
                await api.put('/admin', arr)
                
            } catch (err) {
                console.error(err)
            }
        }
    }

    return (
        <div className="editprofile-page">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Primeiro nome: </label>
                <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={event => setFirstname(event.target.value)}
                    required
                />
                <br/>
                <label htmlFor="lastname">Último nome: </label>
                <input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={event => setLastname(event.target.value)}
                    required
                />
                <br/>
                <label htmlFor="email">E-mail: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <br/>
                <label htmlFor="matricula">Matrícula: </label>
                <input
                    id="matricula"
                    type="text"
                    value={matricula}
                    onChange={event => setMatricula(event.target.value)}
                    required
                />
                <br/>
                <label htmlFor="photourl">Foto de perfil (url): </label>
                <input
                    id="photourl"
                    type="text"
                    value={photourl}
                    onChange={event => setPhotourl(event.target.value)}
                    required
                />
                <button className="btn" type="submit">Enviar</button>
            </form>
        </div>
    )
    
}

export default EditProfile;