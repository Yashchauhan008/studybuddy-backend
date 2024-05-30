const Question = require('../models/question.model');
const Subject = require('../models/subject.model');

// Add a new question
const addQuestion = async (req, res) => {
  const { subject, question, answer, difficultyLevel, code } = req.body;

  try {
    const existingSubject = await Subject.findById(subject);
    if (!existingSubject) {
      return res.status(400).json({ error: 'Subject not found' });
    }

    const newQuestion = new Question({ subject, question, answer, difficultyLevel, code });
    await newQuestion.save();

    res.status(201).json({ message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
