const Question = require('../models/question.model');
const Subject = require('../models/subject.model');
const mongoose = require('mongoose')

// Add a new question
// const addQuestion = async (req, res) => {
//   const { subjectId, question, answer, difficultyLevel, code } = req.body;

//   try {
//     const existingSubject = await Subject.findById(subjectId);
//     if (!existingSubject) {
//       return res.status(400).json({ error: 'Subject not found' });
//     }

//     const newQuestion = new Question({ subject:subjectId, question, answer, difficultyLevel, code });
//     await newQuestion.save();

//     res.status(201).json({ message: 'Question added successfully', question: newQuestion });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
const addQuestion = async (req, res) => {
  const { subjectId, question, answer, difficultyLevel, code } = req.body;

  try {
    // Validate subject ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Create a new question object
    const newQuestionData = {
      subject: subjectId,
      question,
      answer,
      difficultyLevel
    };

    // Include code if it's provided and valid
    if (code && code.trim() !== '') {
      if (mongoose.Types.ObjectId.isValid(code)) {
        newQuestionData.code = code;
      } else {
        return res.status(400).json({ error: 'Invalid code ObjectId' });
      }
    }

    // Create a new question
    const newQuestion = new Question(newQuestionData);

    // Save the new question to the database
    await newQuestion.save();

    // Send a response with the newly created question
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('subject').populate('code');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get questions by subject
const getQuestionsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const questions = await Question.find({ subject: subjectId }).populate('subject').populate('code');
    if (!questions.length) {
      return res.status(404).json({ error: 'No questions found for this subject' });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addQuestion, getAllQuestions, getQuestionsBySubject };
