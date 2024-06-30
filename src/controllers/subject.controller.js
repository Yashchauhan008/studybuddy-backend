const Subject = require('../models/subject.model');
const Question = require('../models/question.model')
// Controller to add a new subject
const newSubject = async (req, res) => {
    const { name, description, imgUrl, cheatsheet } = req.body;

    try {
        const existingSubject = await Subject.findOne({ name });

        if (existingSubject) {
            return res.status(400).json({ error: 'Subject already exists' });
        }

        const subject = new Subject({ name, description, imgUrl,cheatsheet });
        await subject.save();

        res.status(201).json({ message: 'Subject registered successfully' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get all subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get a subject by ID
const getSubjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const subject = await Subject.findById(id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSubjectByName = async (req, res) => {
    const { name } = req.params;
  
    try {
      const subject = await Subject.findOne({ name });
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
      res.status(200).json(subject);
    } catch (error) {
      console.error('Error fetching subject by name:', error);
      res.status(500).json({ error: 'Internal server error name' });
    }
  };


const getSubjectWithQuestions = async (req, res) => {
    const subjectId = req.params.subjectId;
  
    try {
      // Find the subject by ID
      const subject = await Subject.findById(subjectId);
  
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
  
      // Find all questions associated with this subject and populate all fields
      const questions = await Question.find({ subject: subjectId })
        .populate('answers')
        .populate('codes')
        .populate('images')
        .populate('resources');
  
      // Create a new array with questions and their associated data
      const questionsWithAssociatedData = questions.map(question => {
        const questionData = question.toObject();
        if (question.answers.length > 0) {
          questionData.answers = question.answers; // Include all Answer documents
        }
        if (question.codes.length > 0) {
          questionData.codes = question.codes; // Include all Code documents
        }
        if (question.images.length > 0) {
          questionData.images = question.images; // Include all Image documents
        }
        if (question.resources.length > 0) {
          questionData.resources = question.resources; // Include all Resource documents
        }
        return questionData;
      });
  
      // Attach the questions with associated data to the subject object
      const subjectWithQuestions = { ...subject._doc, questions: questionsWithAssociatedData };
  
      // Send the subject object along with its associated questions and data
      res.json(subjectWithQuestions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

  const updateSubjectById = async (req, res) => {
    const { id } = req.params;
    const { name, description, imgUrl, likes } = req.body;
  
    try {
      // Find the subject by ID
      const subject = await Subject.findById(id);
  
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      // Update fields individually if they are present in the request body
      if (name !== undefined) subject.name = name;
      if (description !== undefined) subject.description = description;
      if (imgUrl !== undefined) subject.imgUrl = imgUrl;
      if (likes !== undefined) subject.likes = likes;
  
      // Save the updated subject
      const updatedSubject = await subject.save();
  
      res.status(200).json(updatedSubject);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
module.exports = { newSubject, getAllSubjects, getSubjectById,getSubjectByName, getSubjectWithQuestions,updateSubjectById };
