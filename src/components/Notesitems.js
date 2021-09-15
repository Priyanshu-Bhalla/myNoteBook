import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Notesitems(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note, updateNotes } = props;
    return (

        <div className="col-md-3">
            <div className="card  my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt fa-lg mx-2" onClick={() => { deletenote(note._id) }}></i>
                    <i className="fas fa-edit fa-lg mx-2" onClick={() => updateNotes(note)}></i>
                </div>
            </div>
        </div>

    )
}
