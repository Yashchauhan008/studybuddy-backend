
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

// const deleteQuestionById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Check if the question exists
//     const question = await Question.findById(id);
//     if (!question) {
//       return res.status(404).json({ success: false, message: "Question not found" });
//     }

//     // Delete the question
//     await Question.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Question deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting question:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the question",
//     });
//   }
// };

const deleteQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the question to get its associated subject
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    const subjectId = question.subject;

    // Delete the question
    await Question.findByIdAndDelete(id);

    // Decrement the question count for the associated subject
    await Subject.findByIdAndUpdate(subjectId, { $inc: { question: -1 } });

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the question",
    });
  }
};




module.exports = { addNewQuestion,getQuestionWithAllData,updateQuestionPrivacy,deleteQuestionById};