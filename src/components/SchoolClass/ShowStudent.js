import React from 'react';

function ShowStudent(props) {    
    function handleShow(event) {
        event.preventDefault()
    }
    
    return (
        <>
        <button onClick={handleShow}>Show - { props.student.matricula}</button>
        </>
    )
}

export default ShowStudent;