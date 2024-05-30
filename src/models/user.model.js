const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    prfileUrl:{type:String},
    completedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    workplace:{type:String},
    lastLogin:{ type:Date},
    // subscription: {
    //   type: { type: String, enum: ['none', 'all', 'subject'], default: 'none' }, // Subscription type
    //   subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] // Subscribed subjects
    // }
  }, { timestamps: true });

  const User = mongoose.model('User',userSchema);

  module.exports = User ;