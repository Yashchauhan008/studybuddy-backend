const Image = require('../models/image.model');
const Question = require('../models/question.model');

const addImage = async (req, res) => {
  try {
    const { description, url, questionId } = req.body;
    const image = new Image({ description, url });
    await image.save();

    if (questionId) {
      const question = await Question.findById(questionId);
      question.images.push(image._id);
      await question.save();
    }

    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports={ addImage }