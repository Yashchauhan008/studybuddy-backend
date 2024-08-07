// const Code = require('../models/code.model');
// const Question = require('../models/question.model');

// const addCode = async (req, res) => {
//   const { questionId, description, language, code } = req.body;

//   try {
//     // Find the question by ID
//     const question = await Question.findById(questionId);

//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     // Create a new code entry
//     const newCode = new Code({ description, language, code });
//     await newCode.save();

//     // Update the question's codes array
//     question.codes.push(newCode._id);
//     await question.save();

//     res.status(201).json({ message: 'Code added to question successfully', code: newCode });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add code to question' });
//   }
// };

// module.exports = { addCode };
const Code = require('../models/code.model');
const Question = require('../models/question.model');

const addCode = async (req, res) => {
  const { questionId, description, language, code } = req.body;
  console.log("Received code data:", { questionId, description, language, code });

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

    console.log("Code added successfully:", newCode);

    res.status(201).json({ message: 'Code added to question successfully', code: newCode });
  } catch (error) {
    console.error("Error in addCode:", error);
    res.status(500).json({ error: 'Failed to add code to question', details: error.message });
  }
};

const deleteCode = async (req,res)=>{
  const { id } = req.body;
  try {
    const deletedCode = await Code.findByIdAndDelete(id);
    if (!deletedCode) {
      return res.status(404).send({ message: "Code not found" });
    }
    res.status(200).send({ message: "Code deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting code", error });
  }
}

module.exports = { addCode,deleteCode };