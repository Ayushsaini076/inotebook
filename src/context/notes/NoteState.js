import notecontext from "../NoteContext";
import React from "react";
import { useState } from "react";

const NoteState = (props) =>{
    const notesInitial =[{
        "_id":"62cd650f1da619096f42f176",
        "title":"my title",
        "description":"please wake me up early in the morning",
        "tag":"personal",
        "date":"2022-07-12T12:11:59.499+00:00",
        "__v":"0",
    },
    {
        "_id":"62cd650f1da619096f42f176",
        "title":"my title",
        "description":"please wake me up early in the morning",
        "tag":"personal",
        "date":"2022-07-12T12:11:59.499+00:00",
        "__v":"0",
    },
    {
        "_id":"62cd650f1da619096f42f176",
        "title":"my title",
        "description":"please wake me up early in the morning",
        "tag":"personal",
        "date":"2022-07-12T12:11:59.499+00:00",
        "__v":"0",
    },

]
const [notes,setNotes]=useState(notesInitial)
  
    return(
        <notecontext.Provider value = {{notes,setNotes}}>
            {props.children}
        </notecontext.Provider>
    )


}
export default NoteState;