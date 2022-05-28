import React, { useContext, useState } from 'react';
import Notes from './Notes';
import notesContext from '../context/Notes/NotesContext';

function Home(props) {
    const context = useContext(notesContext);
    const { addNote } = context

    const [note, setNote] = useState({ "title": "", "description": "", "tag": "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ "title": "", "description": "", "tag": "" });
        props.showAlert("success","Note has been created successfully")
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
        
    }
    return (
        <>
            <div className='container' style={{marginBottom:"20px"}}>
                <h1>Add Note</h1>
                <form onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength="5" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={note.description} style={{ "height": "100px" }} onChange={onChange} minLength="5" required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-dark">Add Note</button>
                </form>
            </div>
            <Notes showAlert={props.showAlert} />
        </>
    )
}

export default Home