import express from "express";
import axios from "axios";
// import dotenv from "dotenv";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          //everything for the data
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );
    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      //how are we getting chatEnginerResponse keywor?
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password, //look at api rest
      },
      {
        headers: { "Private-key": process.env.PRIVATE_KEY },
      }
    );
    // console.log(chatEngineResponse.data);
    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
