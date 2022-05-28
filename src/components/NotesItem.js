import React, { useContext } from 'react'
import notesContext from '../context/Notes/NotesContext'

function NotesItem(props) {
    const { title, description, _id } = props.note
    const context = useContext(notesContext)
    const { deleteNote } = context
    const { note, updateNote } = props


    return (
        <>
         {/* style={{background:"rgb(0 140 255 / 10%)"}} */}
            <div className="col-md-4 my-2">
                <div className="card">
                    <div className="card-body" style={{ "marginTop": "20px" }}>
                        <h5 className="card-title">{props.index+1}. {title}</h5>
                        <p className="card-text">{description}</p>
                        <div className="" id="icons">
                            <i className="fa-solid fa-trash-can" id='iconDelete' onClick={() => { deleteNote(_id); props.showAlert("success","Not has been deleted successfully") }}></i>
                            <i className="fa-solid fa-pen-to-square" id='iconEdit' onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default NotesItem