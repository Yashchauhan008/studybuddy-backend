const Code = require('../models/code.model');
const Question = require('../models/question.model');

// Add a code snippet
const addCode = async (req, res) => {
  const { language, code } = req.body;

  try {
    const newCode = new Code({ language, code });
    await newCode.save();

    res.status(201).json({ message: 'Code snippet added successfully', code: newCode });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all code snippets
const getAllCode = async (req, res) => {
  try {
    const codes = await Code.find();
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit a code snippet
const editCode = async (req, res) => {
  const { id } = req.params;
  const { language, code } = req.body;

  try {
    const codeSnippet = await Code.findByIdAndUpdate(id, { language, code }, { new: true });
    if (!codeSnippet) {
      return res.status(404).json({ error: 'Code snippet not found' });
    }

    res.status(200).json({ message: 'Code snippet updated successfully', code: codeSnippet });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get code snippets by question ID
const getCodeByQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const codeIds = question.code; // Assuming question.code is an array of Code IDs
    const codes = await Code.find({ _id: { $in: codeIds } });

    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addCode, getAllCode, editCode, getCodeByQuestion };
