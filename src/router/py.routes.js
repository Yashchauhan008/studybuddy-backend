const express = require("express");
const pyRouter = express.Router();
const { newPy, getAllPys, deletePy, updatePy } = require("../controllers/py.controller");

pyRouter.post("/add", newPy);
pyRouter.get("/all", getAllPys);
pyRouter.delete("/delete", deletePy);
pyRouter.put("/:id", updatePy);

module.exports = pyRouter;
