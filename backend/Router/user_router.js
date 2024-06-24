const express = require("express");
const router = express.Router();
const user_service = require("../Service/user_service");
const mongoose = require('mongoose');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    next();
};

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await user_service.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await user_service.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a user by ID
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const user = await user_service.getById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a user by ID
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const user = await user_service.update(req.params.id, req.body);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        const user = await user_service.delete_object(req.params.id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
