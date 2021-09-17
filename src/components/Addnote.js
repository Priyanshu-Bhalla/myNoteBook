import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddLogo from '../img/addnote.svg';
export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleAddNotes = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Your Note has been added successfully", "success");


    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="uppernote my-3">
            <img src={AddLogo} alt="" className="addnote_img" />
            <div className="cardA container ">
                <h1 className="my-3 mb-2">Add Your Notes</h1>
                <form>
                    <div className="form-group">
                        {/* <label htmlFor="title">Note Title:</label> */}
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" placeholder="Title" value={note.title} onChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="description">Note Description:</label> */}
                        <textarea className="form-control" id="description" rows="3" name="description" placeholder="Description" value={note.description} onChange={handleOnChange}></textarea>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="tag">Enter Tag:</label> */}
                        <input type="text" className="form-control" id="tag" aria-describedby="emailHelp" name="tag" placeholder="Enter Tag" value={note.tag} onChange={handleOnChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn  mb-3 btn_add" onClick={handleAddNotes}>Add Note</button>
                </form>
            </div>

        </div>
    )
}
