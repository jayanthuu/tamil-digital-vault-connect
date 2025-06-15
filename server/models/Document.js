// server/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  file_name: { type: String, required: true },
  file_url: { type: String, required: true },
  upload_status: { type: String, enum: ['pending', 'in_progress', 'success', 'error'], default: 'pending' },
  verification_status: { type: String, enum: ['not_verified', 'verified', 'rejected'], default: 'not_verified' },
  rejection_reason: { type: String },
  ocr_text: { type: String },
  ocr_confidence: { type: Number },
  metadata: { type: Object },
  hash: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
