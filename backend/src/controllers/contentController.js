const contentService = require("../services/contentService");
const User=require("../models/User");
const Content=require("../models/Content");
const createContent = async (req, res) => {
  try {
    const content = await contentService.createContent(req.body, req.user._id);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllContent = async (req, res) => {
  try {
    const content = await contentService.getAllContent();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res, next) => {
  try {
    const updatedContent = await contentService.updateContent(
      req.params.id,
      req.body,
      req.user.id // assuming auth middleware sets req.user
    );

    res.status(200).json({
      success: true,
      data: updatedContent,
    });
  } catch (error) {
    next(error);
  }
};
const deleteContent = async (req, res, next) => {
  try {
    await contentService.deleteContent(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);

    const posts = await Content.find({
      createdBy: req.user._id
    }).populate('createdBy', 'name');
   // console.log("Posts found:", posts);
    res.status(200).json(posts);

  } catch (error) {
    console.log("ERROR IN getMyPosts:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getMyPosts
};