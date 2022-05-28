import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../context/Notes/NotesContext';
import NotesItem from './NotesItem';
import { useNavigate } from 'react-router-dom'

function Notes(props) {
    const [note, setNote] = useState({ "id": "", "etitle": "", "edescription": "", "etag": "" })
    const context = useContext(notesContext);
    const { getNotes, editNote, notes } = context;
    let navigate = useNavigate();
    useEffect((e) => {
        if (localStorage.getItem('auth-token')) {
            getNotes();
        }
        else {
            props.showAlert("danger", "Login required");
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        myRef.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const myRef = useRef(null)
    const refClose = useRef(null)

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("success","Note has been updated successfully");
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <button style={{ "display": "none" }} ref={myRef} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} style={{ "height": "100px" }} onChange={onChange} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 style={{ color: "black" }}>Your Notes</h2>
                {notes.length === 0 && "Not a single note to show"}
                <div className="row">
                    {
                        context.notes.map((note, index) => {
                            return <NotesItem key={note._id} showAlert={props.showAlert} index={index} updateNote={updateNote} note={note} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes