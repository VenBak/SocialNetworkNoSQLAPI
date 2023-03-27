const { Schema, model, Types } = require('mongoose');

// Reactions Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, 'Maximum characters reached']
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: format_date,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, 'Thought text required'],
      maxLength: [280, 'Maximum characters reached']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: format_date,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Function to format date to MM/DD/YYYY
function format_date(date) {
  return date.toLocaleString();
}

// Virtual that gets length of reactions array
thoughtSchema.virtual('reactionCount ')
  .get(function () {
      return this.reactions.length;
  })

// Initialize the model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;