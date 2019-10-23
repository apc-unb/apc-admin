import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

function GetNews() {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))
    const [news, setNews] = useState(admin_data.news)

    function beautifulDate(date) {
        date = date.split(".")
        date = date[0].split("T")
        let day = date[0].split("-")
        day = day[2] + "/" + day[1] + "/" + day[0]
        return day + " às " + date[1] 
    }

    async function handleDelete(ID) {
        if(window.confirm("Deseja mesmo deletar esta notícia?")){
            try {
                await api.delete('/news', { data: [ { "id" : ID } ] } )
            } catch(err) {
                console.error(err)
            }
        }
    }

    useEffect( () => {
        async function getData() {
            const response = await api.get('/news/' + admin_data.class.ID)
            setNews(response.data)
        }
        getData()
    }, [news, admin_data])
    

    return (
        <ul className="GetNews">
        {news.map( n => (
            <li key={n.ID}>
                <h2>{ n.title }</h2>
                {(admin_data.class.ID === n.ClassID) &&
                    <h3>{admin_data.class.classname} - {admin_data.class.year}/{admin_data.class.season}</h3>
                }
                {n.tags.map((tag, index) => (
                    <span key={tag + index}>[ { tag } ] / </span>
                ))}
                <p>{ n.description }</p>
                <small>{ beautifulDate(n.updatedat) }</small>
                <button onClick={() => handleDelete( n.ID) }>Deletar</button>
            </li>
        ))}
        </ul>
    )

}

export default GetNews;