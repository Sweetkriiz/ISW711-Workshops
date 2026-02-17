const express = require('express');
const router = express.Router();

const Course = require('../models/course');
const Teacher = require('../models/teacher');

// POST Course
router.post('/course', async (req, res) => {
    try {
        const { name, code, description, teacherId } = req.body;

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(400).json({
                message: 'El profesor no existe'
            });
        }

        const course = new Course({
            name,
            code,
            description,
            teacherId
        });

        const savedCourse = await course.save();

        res.status(201).json(savedCourse);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET Course
router.get('/course', async (req, res) => {
    try{
        if(!req.query.id){
            const data = await Course.find();
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// PUT course
router.put('/course/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                credits: req.body.credits
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE course
router.delete('/course/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
            message: `Course ${deletedCourse.name} deleted successfully`
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST Teacher
router.post('/teacher', async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        const saved = await teacher.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET Teachers
router.get('/teacher', async (req, res) => {
    const data = await Teacher.find();
    res.json(data);
});

// PUT Teacher
router.put('/teacher/:id', async (req, res) => {
    const updated = await Teacher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// DELETE Teacher
router.delete('/teacher/:id', async (req, res) => {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted' });
});

module.exports = router;
