require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./model/userModel");
const Note = require("./model/noteModel");


const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authentificateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }));


app.post("/create-account", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    return res.status(400).json({ error: true, message: "Full name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullname,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "36000m" }
  );

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registered successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found!" });
  }

  if (userInfo.email === email && userInfo.password === password) {
    const accessToken = jwt.sign(
        { userId: userInfo._id }, // Make sure userInfo._id is defined
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "36000m" }
    );

    return res.json({
      error: false,
      message: "Login successfully",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});


app.get("/get-users", authentificateToken, async (req, res) => {
  const { userId } = req.user; // Directly get userId from req.user

  // Find the user based on the userId from the token
  const isUser = await User.findOne({ _id: userId });

  if (!isUser) {
      return res.status(401).json({ error: true, message: "Invalid credentials" });
  }

  return res.json({
      user: {
          fullName: isUser.fullname,
          email: isUser.email,
          "_id": isUser._id,
          createOn: isUser.createOn,
      },
      message: "User retrieved successfully",
  });
});



app.post("/add-note", authentificateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { userId } = req.user; // Access userId

  if (!title) {
      return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
      return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
      const note = new Note({
          title,
          content,
          tags: tags || [],
          userId, // Use userId here

      });

      await note.save();

      return res.json({
          error: false,
          note,
          message: "Note added successfully",
      });
  } catch (error) {
      console.error("Error while saving note:", error); // Log the error
      return res.status(500).json({
          error: true,
          message: "Internal server error"
      });
  }
});

app.put("/edit-note/:noteId", authentificateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req; // Get user directly from req

  // Ensure user is authenticated
  if (!user || !user.userId) {
      return res.status(403).json({ error: true, message: "User not authenticated" });
  }

  if (!title && !content && !tags && isPinned === undefined) {
      return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
      const note = await Note.findOne({ _id: noteId, userId: user.userId }); 
      if (!note) {
          return res.status(404).json({ error: true, message: "Note not found" });
      }

      // Update only the fields that are provided
      if (title !== undefined) note.title = title; 
      if (content !== undefined) note.content = content;
      if (tags !== undefined) note.tags = tags; 
      if (isPinned !== undefined) note.isPinned = isPinned;

      await note.save();

      return res.json({
          error: false,
          note,
      });
  } catch (error) {
      console.error("Error while updating note:", error); 
      return res.status(500).json({
          error: true,
          message: "Server error",
      });
  }
});

app.get("/get-all-notes", authentificateToken, async (req, res) => {
  const { userId } = req.user; // Get userId from the request

  try {
      const notes = await Note.find({ userId: userId }).sort({isPinned: -1}); // Fetch notes for the authenticated user
      return res.json({
          error: false,
          notes,
          message:"All notes retrieved Successfully"
      });
  } catch (error) {
      console.error("Error while fetching notes:", error);
      return res.status(500).json({
          error: true,
          message: "Server error",
      });
  }
});
 
app.delete("/delete-notes/:noteId", authentificateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { userId } = req.user; // Get userId from the request

  try {
      // Find the note by ID and ensure it belongs to the user
      const note = await Note.findOneAndDelete({ _id: noteId, userId: userId });
      
      if (!note) {
          return res.status(404).json({ error: true, message: "Note not found or you don't have permission to delete this note." });
      }

      return res.json({ error: false, message: "Note deleted successfully." });
  } catch (error) {
      console.error("Error while deleting note:", error);
      return res.status(500).json({ error: true, message: "Server error." });
  }
});


app.put("/update-note-pinned/:noteId", authentificateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body; // Include isPinned in the request body
  const { userId } = req.user; // Get userId from the request

  if (!title && !content && !tags && isPinned === undefined) {
      return res.status(400).json({ error: true, message: "No changes provided." });
  }

  try {
      // Find the note by ID and ensure it belongs to the user
      const note = await Note.findOne({ _id: noteId, userId: userId });

      if (!note) {
          return res.status(404).json({ error: true, message: "Note not found." });
      }

      // Update fields if provided
      if (title !== undefined) note.title = title;
      if (content !== undefined) note.content = content;
      if (tags !== undefined) note.tags = tags;
      if (isPinned !== undefined) note.isPinned = isPinned; // Update isPinned

      await note.save(); // Save the updated note

      return res.json({
          error: false,
          note,
      });
  } catch (error) {
      console.error("Error while updating note:", error);
      return res.status(500).json({ error: true, message: "Server error." });
  }
});




app.listen(8000, () => {
  console.log("Server running on port 8000");
});

module.exports = app;

