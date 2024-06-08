const Resource = require('../models/resource.model');
const Question = require('../models/question.model');

const addResource = async (req, res) => {
  try {
    const { description, url, questionId } = req.body;
    const resource = new Resource({ description, url });
    await resource.save();

    if (questionId) {
      const question = await Question.findById(questionId);
      question.resources.push(resource._id);
      await question.save();
    }

    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addResource }