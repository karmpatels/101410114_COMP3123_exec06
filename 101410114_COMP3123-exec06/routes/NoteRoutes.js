const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel.js');

// Create a new Note
router.post('/notes', (req, res) => {
    if (!req.body.noteDescription || !req.body.noteTitle) {
        return res.status(400).send({ message: "Note content cannot be empty" });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });

    note.save()
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => res.status(200).send(notes))
        .catch(err => res.status(500).send({ message: err.message }));
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.status(200).send(note);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    if (!req.body.noteDescription || !req.body.noteTitle) {
        return res.status(400).send({ message: "Note content cannot be empty" });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.status(200).send(note);
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.status(200).send({ message: "Note deleted successfully" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
});

module.exports = router;
