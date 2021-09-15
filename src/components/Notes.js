import React from 'react'
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitems from '../components/Notesitems';
import Addnote from './Addnote';
export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getnotes } = context;
    useEffect(() => {
        getnotes();
    }, [])
    return (
        <>
            <Addnote />

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="my-3">Your Notes</h1>
            <div className="row my-3">
                {notes.map((note) => {
                    return <Notesitems key={note._id} note={note} />
                })}
            </div>
        </>
    )
}
