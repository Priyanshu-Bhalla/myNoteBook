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


        const noteDetail = {
            "_id": "613c335d8113c9w00db082e488",
            "user": "6139c1e187b6c37f17c5e6da",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-11T04:51:36.466Z",
            "__v": 0
        }
        setNotes(notes.concat(noteDetail));
    }

    //deleting a note
    const deletenote = (id) => {
        //Api call is pending
        const newNotes = notes.filter((note) => { return note._id !== id });
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


        //logic for updating notes
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addnote, deletenote, updatenote, getnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;