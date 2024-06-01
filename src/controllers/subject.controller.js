const Subject = require('../models/subject.model');
const Question = require('../models/question.model')
// Controller to add a new subject
const newSubject = async (req, res) => {
    const { name, description, imgUrl } = req.body;

    try {
        const existingSubject = await Subject.findOne({ name });

        if (existingSubject) {
            return res.status(400).json({ error: 'Subject already exists' });
        }

        const subject = new Subject({ name, description, imgUrl });
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
  
      // Find all questions associated with this subject and populate the code field
      const questions = await Question.find({ subject: subjectId }).populate('code');
  
      // Create a new array with questions and their associated code data
      const questionsWithCodeData = questions.map(question => {
        const questionData = question.toObject();
        if (question.code) {
          questionData.code = question.code; // Include the entire Code document
        }
        return questionData;
      });
  
      // Attach the questions with code data to the subject object
      const subjectWithQuestions = { ...subject._doc, questions: questionsWithCodeData };
  
      // Send the subject object along with its associated questions and code data
      res.json(subjectWithQuestions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
module.exports = { newSubject, getAllSubjects, getSubjectById,getSubjectByName, getSubjectWithQuestions };
