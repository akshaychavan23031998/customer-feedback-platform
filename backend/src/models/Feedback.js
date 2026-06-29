import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'Bug',
        'Feature Request',
        'UI/UX',
        'Performance',
        'Support',
        'Billing',
        'General',
        'Other',
      ],
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Resolved', 'Archived'],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Web',
      trim: true,
    },
    user: {
      name: {
        type: String,
        default: 'Anonymous',
        trim: true,
        maxlength: 50,
      },
      email: {
        type: String,
        default: '',
        trim: true,
        lowercase: true,
      },
    },
    metadata: {
      browser: {
        type: String,
        default: 'unknown',
      },
      device: {
        type: String,
        default: 'Web',
      },
      ipAddress: {
        type: String,
        default: 'hidden',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ category: 1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ rating: 1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;