import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const InitialNotes = [];
    const [notes, setNotes] = useState(InitialNotes);

    //get all the note
    const getnotes = async () => {
        //Api call for adding a note
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authen-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOWMxZTE4N2I2YzM3ZjE3YzVlNmRhIn0sImlhdCI6MTYzMTI2MzU1MH0.eqMDXiC_uyGWBmxOW4ZJRoW6ZxJxVOZ5Puz2jdCjqfs'
            },

        });
        const json = await response.json();
        setNotes(json);
    }

    //adding a note
    const addnote = async (title, description, tag) => {
        //Api call for adding a note
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authen-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOWMxZTE4N2I2YzM3ZjE3YzVlNmRhIn0sImlhdCI6MTYzMTI2MzU1MH0.eqMDXiC_uyGWBmxOW4ZJRoW6ZxJxVOZ5Puz2jdCjqfs'
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });


        const noteDetail = await response.json();
        setNotes(notes.concat(noteDetail));
    }

    //deleting a note
    const deletenote = async (id) => {
        //Api call for deleting a note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authen-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOWMxZTE4N2I2YzM3ZjE3YzVlNmRhIn0sImlhdCI6MTYzMTI2MzU1MH0.eqMDXiC_uyGWBmxOW4ZJRoW6ZxJxVOZ5Puz2jdCjqfs'
            },

        });
        const newNotes = notes.filter((note) => { return note._id !== id });//this is gonna be the notes after deletion
        setNotes(newNotes);
    }

    //updating a note
    const updatenote = async (id, title, description, tag) => {
        //API Call for updating notes
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'authen-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOWMxZTE4N2I2YzM3ZjE3YzVlNmRhIn0sImlhdCI6MTYzMTI2MzU1MH0.eqMDXiC_uyGWBmxOW4ZJRoW6ZxJxVOZ5Puz2jdCjqfs'
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const newNote = JSON.parse(JSON.stringify(notes));//this is gonna be the updated note
        //logic for updating notes
        for (let index = 0; index < notes.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);

    }



    return (
        <noteContext.Provider value={{ notes, setNotes, addnote, deletenote, updatenote, getnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;