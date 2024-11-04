// routes/openUserRouter.js
const { Router } = require("express");
const { loadMessagebyID } = require("../config/db");

const openUserRouter = () => {
  const router = Router();

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const message = await loadMessagebyID(id);

    res.render("open", { message });
  });

  return router;
};

module.exports = openUserRouter;
