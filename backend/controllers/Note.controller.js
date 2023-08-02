const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = express.Router();
const Note = require("../models/Note");
const Application = require("../models/Application");
const { userAuth } = require("../middleware/auth");

// @route POST api/note/add
// @desc Create a note
// @access Public
noteRoutes
    .route("/add")
    .post(userAuth, async function (req, res) {
        console.log("HIT");
    try {
        console.log(req.user)
        const newNote = new Note({
            message: req.body.message,
            username: req.user.username,
            application: req.body.applicationId, 
        });

        const savedNote = await newNote.save();

        const application = await Application.findById(req.body.applicationId);
        if (!application) {
        res.status(400).send("Application not found");
        return;
        }

        res.status(200).send({ note: savedNote });
    } catch (err) {
        res.status(500).send("Error adding note");
    }
    });

// @route GET api/note/getByApplication/
// @desc Get all notes from a specific application
// @access Public
noteRoutes
    .route("/getByApplication/:id")
    .get(userAuth, async function (req, res) {
        try {
            const applicationId = req.params.id;
            const notes = await Note.find({ application: applicationId }).sort({ createdAt: -1 });

            if (!notes) {
                res.status(400).send("No notes found for this application");
                return;
            }

            res.status(200).send({ notes });
        } catch (err) {
            res.status(500).send("Error fetching notes");
        }
    });

module.exports = noteRoutes;