const Code = require('../models/code.model');
const Question = require('../models/question.model');

const addCode = async (req, res) => {
  const { questionId, description, language, code } = req.body;

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Create a new code entry
    const newCode = new Code({ description, language, code });
    await newCode.save();

    // Update the question's codes array
    question.codes.push(newCode._id);
    await question.save();

    res.status(201).json({ message: 'Code added to question successfully', code: newCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add code to question' });
  }
};

module.exports = { addCode };
