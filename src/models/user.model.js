const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    completedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    profile: {
      name: { type: String },
      course: { type: String },
      workPlace: { type: String },
    },
    // subscription: {
    //   type: { type: String, enum: ['none', 'all', 'subject'], default: 'none' }, // Subscription type
    //   subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] // Subscribed subjects
    // }
  }, { timestamps: true });

  const User = mongoose.model('User',userSchema);

  module.exports = User ;