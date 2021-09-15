import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleAddNotes = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })

    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add Your Notes</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Note Title:</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" value={note.title} onChange={handleOnChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="description">Note Description:</label>
                    <textarea className="form-control" id="description" rows="3" name="description" value={note.description} onChange={handleOnChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Enter Tag:</label>
                    <input type="text" className="form-control" id="tag" aria-describedby="emailHelp" name="tag" value={note.tag} onChange={handleOnChange} />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddNotes}>Add Note</button>
            </form>
        </>
    )
}
