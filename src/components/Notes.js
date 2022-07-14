import React from 'react'
import notecontext from "../context/NoteContext"
import { useContext } from 'react'
import Noteitem from './Noteitem'

const Notes = () => {
 const context = useContext(notecontext);
const {notes,setNotes}=context;
  return (
    <>
    <div className="row my-3">
    <h1>Your Notes</h1>
    {notes.map((note)=>{
     return <Noteitem note = {note}/>
   
 
    })}
   
    </div>
    </>
  )
}

export default Notes
