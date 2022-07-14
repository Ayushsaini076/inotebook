const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route1: Get all notes using : Get "/api/auth/fetchallnotes".Login required
router.get('/fetchallnotes',fetchuser, async (req,res) =>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    
    
})

//Route2: Add a new Note using : POST "/api/auth/addnote".Login required
router.post('/addnote',fetchuser,[ body('title','Enter a valid title').isLength({ min: 3 }),
body('Description','Description must be atleast 5 characters')
], async (req,res) =>{
    try {const { title , description , tag} = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    // Route 3: Update an Existing Note using : Put "/app/notes/updatenote"/ Login required
    router.post('/updatenote/:id',fetchuser,async (req,res)=>{
        const {title, description,tag}= req.body;

        //k Create a newNoe object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.title = description};
        if(tag){newNote.title = tag};

        // Find the note to be updated and update it
        // let note = await Note.findById(req.params.id);
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Allowed") }

        if(note.user.tostring() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

         note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json({note})
    })

     // Route 3: Deleting an Existing Note using : DELETE "/app/notes/deletenote"/ Login required
     router.post('/deletenote/:id',fetchuser,async (req,res)=>{
        // const {title, description,tag}= req.body;

       

        // Find the note to be updated and update it
        // let note = await Note.findById(req.params.id);
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Allowed") }

        if(note.user.tostring() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

         note = await Note.findByIdAndUpdate(req.params.id)
        res.json({"Success":"Note deleted Succeffully"})
    })


module.exports = router