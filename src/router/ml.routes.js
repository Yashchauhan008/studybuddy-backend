const express = require("express");
const mlRouter = express.Router();
const { newMl, getAllMls, deleteMl, updateMl } = require("../controllers/ml.controller");

mlRouter.post("/add", newMl);
mlRouter.get("/all", getAllMls);
mlRouter.delete("/delete", deleteMl);
mlRouter.put("/:id", updateMl);

module.exports = mlRouter;
