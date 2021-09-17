import React, { useState } from 'react'
import { useContext, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitems from '../components/Notesitems';
import Addnote from './Addnote';
import { useHistory } from "react-router";
export default function Notes(props) {
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id: "" });
    let history = useHistory();
    const context = useContext(noteContext);
    const { notes, getnotes, updatenote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            getnotes();
        }
        else {
            history.push("/login");
            console.log(history)
        }

        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef()
    const updateNotes = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }
    const handleUpdating = () => {
        console.log('updating .....');
        updatenote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Notes Have Been Updated Successfully", "success")
    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Your Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Note Title:</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} name="etitle" onChange={handleOnChange} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Note Description:</label>
                                    <textarea className="form-control" id="edescription" rows="3" name="edescription" value={note.edescription} onChange={handleOnChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Enter Tag:</label>
                                    <input type="text" className="form-control" id="etag" aria-describedby="emailHelp" value={note.etag} name="etag" onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleUpdating}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="my-3">Your Notes</h1>

            <h2 className="text-muted">{notes.length === 0 && 'Notes You Add Will Appear Here'}</h2>

            <div className="row my-3">
                {notes.map((note) => {
                    return <Notesitems key={note._id} note={note} updateNotes={updateNotes} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
