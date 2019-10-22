import React, { useState } from 'react';
import api from '../../services/api.js';

function News() {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))
    const [news, setNews] = useState(admin_data.news)
    console.log(admin_data.news)

    function beautifulDate(date) {
        date = date.split(".")
        date = date[0].split("T")
        //date[1] = date[1].split(".")
        return date[0] + " às " + date[1] 
    }
    

    return (
        <ul>
        {news.map( n => (
            <li key={n.ID}>
                <h2>{ n.title }</h2>
                {(admin_data.class.ID === n.ClassID) &&
                    <h3>{admin_data.class.classname} - {admin_data.class.year}/{admin_data.class.season}</h3>
                }
                <h3></h3>
                {n.tags.map(tag => (
                    <span key={tag}>[ { tag } ] / </span>
                ))}
                <p>{ n.description }</p>
                <small>{ beautifulDate(n.updatedat) }</small>
            </li>
        ))}
        </ul>
    )

}

export default News;