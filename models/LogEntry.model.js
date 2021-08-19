const mongoose = require('mongoose');

const logEntrySchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true},
  description: String,
  comments: String,
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  visitDate: { required: true, type: Date},
}, {
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;