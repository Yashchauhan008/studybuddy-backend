// const Question = require('../models/question.model');
// const Subject = require('../models/subject.model');
// const mongoose = require('mongoose')
// const Answer = require('../models/answer.model');
// const Code = require('../models/code.model');
// const Image = require('../models/image.model');
// const Resource = require('../models/resource.model');

// const addQuestion = async (req, res) => {
//   const { subjectId, question, difficultyLevel, answerIds, codeIds, imageIds, resourceIds } = req.body;

//   try {
//     // Create a new question object
//     const newQuestion = new Question({
//       subject: subjectId,
//       question,
//       difficultyLevel,
//     });

//     // Save the new question
//     await newQuestion.save();

//     // Associate answers with the question
//     if (answerIds && answerIds.length > 0) {
//       const answers = await Answer.find({ _id: { $in: answerIds } });
//       newQuestion.answers = answers.map(answer => answer._id);
//       await newQuestion.save();
//     }

//     // Associate codes with the question
//     if (codeIds && codeIds.length > 0) {
//       const codes = await Code.find({ _id: { $in: codeIds } });
//       newQuestion.codes = codes.map(code => code._id);
//       await newQuestion.save();
//     }

//     // Associate images with the question
//     if (imageIds && imageIds.length > 0) {
//       const images = await Image.find({ _id: { $in: imageIds } });
//       newQuestion.images = images.map(image => image._id);
//       await newQuestion.save();
//     }

//     // Associate resources with the question
//     if (resourceIds && resourceIds.length > 0) {
//       const resources = await Resource.find({ _id: { $in: resourceIds } });
//       newQuestion.resources = resources.map(resource => resource._id);
//       await newQuestion.save();
//     }

//     // Send success response
//     res.status(201).json({ message: 'Question added successfully', question: newQuestion });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add question' });
//   }
// };


// module.exports = { addQuestion };

const Question = require('../models/question.model');
const Subject = require('../models/subject.model');

const addNewQuestion = async (req, res) => {
  try {
    const { subject, question, difficultyLevel, isPrivate } = req.body;

    const newQuestion = new Question({
      subject,
      question,
      difficultyLevel,
      isPrivate
    });

    const savedQuestion = await newQuestion.save();

    // Update the subject's question count
    await Subject.findByIdAndUpdate(subject, { $inc: { question: 1 } });

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error adding new question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getQuestionWithAllData = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findById(questionId)
      .populate('answers')
      .populate('codes')
      .populate('images')
      .populate('resources');

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error('Error fetching question data:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateQuestionPrivacy = async (req, res) => {
  const { id } = req.params;
  const { isPrivate } = req.body;

  if (typeof isPrivate !== 'boolean') {
    return res.status(400).json({ message: 'Invalid input for isPrivate' });
  }

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.isPrivate = isPrivate;
    await question.save();

    res.status(200).json({ message: 'Question privacy status updated successfully', question });
  } catch (error) {
    console.error('Error updating question privacy:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { addNewQuestion,getQuestionWithAllData,updateQuestionPrivacy};