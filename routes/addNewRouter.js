// routes/addNewRouter.js
const { Router } = require("express");
const {addMessages} = require("../config/db");

const addNewRouter = (messages) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("form");
  });

  router.post("/", async (req, res) => {
    const username = req.body.name;
    const message = req.body.post;

    try {
      await addMessages(message, username);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding message to the database:", error);
      res.status(500).send("Error adding message to the database");
    }
  });

  return router;
};

module.exports = addNewRouter;
