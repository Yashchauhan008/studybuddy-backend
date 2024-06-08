const Answer = require('../models/answer.model');
const Question = require('../models/question.model');

const addAnswer = async (req, res) => {
  try {
    const { description, answer, questionId } = req.body;
    const answerEntry = new Answer({ description, answer });
    await answerEntry.save();

    if (questionId) {
      const question = await Question.findById(questionId);
      question.answers.push(answerEntry._id);
      await question.save();
    }

    res.status(201).json(answerEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports={addAnswer}