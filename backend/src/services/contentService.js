const Content = require("../models/Content");

// Create Content
const createContent = async (data, userId) => {
  return await Content.create({
    ...data,
    createdBy: userId
  });
};

// Get All Content
const getAllContent = async () => {
  return await Content.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};

// Update Content
const updateContent = async (id, data, userId) => {
  const content = await Content.findById(id);

  if (!content) {
    const error = new Error("Content not found");
    error.statusCode = 404;
    throw error;
  }

  // Only creator can edit
  if (content.createdBy.toString() !== userId) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }

  return await Content.findByIdAndUpdate(id, data, { new: true });
};

// Delete Content
const deleteContent = async (id, userId) => {
  const content = await Content.findById(id);

  if (!content) {
    const error = new Error("Content not found");
    error.statusCode = 404;
    throw error;
  }

  if (content.createdBy.toString() !== userId) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }

  return await Content.findByIdAndDelete(id);
};

module.exports = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent
};