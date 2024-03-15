const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mernstack_crud")
  .then(() => {
    console.log("Database Connected Successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// create user
app.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// read all user
app.get("/readalluser", async (req, res) => {
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// read single data
app.get("/read/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update date
app.put("/updateuser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
    res.send(deletedUser);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
