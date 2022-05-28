const express = require("express")
const router = express.Router()
const Notes = require('../modules/Notes')
const userDeatails = require("../middleware/userDetails");
const { body, validationResult } = require('express-validator');


// Route-1 : Creating a fetchallnotes using GET in localhost:5000/api/notes/fetchallnotes. Login required.
router.get('/fetchallnotes', userDeatails, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {

    }
})

// Route-2 : Creating a add note using POST in localhost:5000/api/notes/addnote. Login required.
router.post('/addnote', [
    body('title', 'Minimum lenght required for title is 3').isLength({ min: 3 }),
    body('description', 'Minimum lenght required for description is 5').isLength({ min: 5 })
], userDeatails, async (req, res) => {


    //Send error messege if any error occurred

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body

        const note = await Notes.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        res.json(note)

    } catch (error) {

    }
})

//Router-3 : Creating a updating note using Put request on localhost:5000/api/notes/updatenotes. Login required

router.put('/updatenotes/:id', userDeatails, async (req, res) => {

    const { title, description, tag } = req.body
    try {

        const newNote = {}
        if (title) newNote.title = title
        if (description) newNote.description = description
        if (tag) newNote.tag = tag

        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send({ "success": "Note has been updated", note: newNote })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})


//Router-4 : Creating a deleting note using Delete request on localhost:5000/api/notes/deletenotes. Login required

router.delete('/deletenotes/:id', userDeatails, async (req, res) => {
    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({ "success": "Note has been deleted" })
    } catch (error) {
        res.status(500).send("Hey, Internal server error")
    }
})


module.exports = router