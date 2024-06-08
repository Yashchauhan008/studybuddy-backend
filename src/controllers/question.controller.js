const Question = require('../models/question.model');
const Subject = require('../models/subject.model');
const mongoose = require('mongoose')
const Answer = require('../models/answer.model');
const Code = require('../models/code.model');
const Image = require('../models/image.model');
const Resource = require('../models/resource.model');

const addQuestion = async (req, res) => {
  const { subjectId, question, difficultyLevel, answerIds, codeIds, imageIds, resourceIds } = req.body;

  try {
    // Create a new question object
    const newQuestion = new Question({
      subject: subjectId,
      question,
      difficultyLevel,
    });

    // Save the new question
    await newQuestion.save();

    // Associate answers with the question
    if (answerIds && answerIds.length > 0) {
      const answers = await Answer.find({ _id: { $in: answerIds } });
      newQuestion.answers = answers.map(answer => answer._id);
      await newQuestion.save();
    }

    // Associate codes with the question
    if (codeIds && codeIds.length > 0) {
      const codes = await Code.find({ _id: { $in: codeIds } });
      newQuestion.codes = codes.map(code => code._id);
      await newQuestion.save();
    }

    // Associate images with the question
    if (imageIds && imageIds.length > 0) {
      const images = await Image.find({ _id: { $in: imageIds } });
      newQuestion.images = images.map(image => image._id);
      await newQuestion.save();
    }

    // Associate resources with the question
    if (resourceIds && resourceIds.length > 0) {
      const resources = await Resource.find({ _id: { $in: resourceIds } });
      newQuestion.resources = resources.map(resource => resource._id);
      await newQuestion.save();
    }

    // Send success response
    res.status(201).json({ message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};


module.exports = { addQuestion };
