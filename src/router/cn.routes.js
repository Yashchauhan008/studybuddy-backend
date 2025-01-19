const express = require("express");
const cnRouter = express.Router();
const { newCn, getAllCns, deleteCn, updateCn } = require("../controllers/cn.controller");

cnRouter.post("/add", newCn);
cnRouter.get("/all", getAllCns);
cnRouter.delete("/delete", deleteCn);
cnRouter.put("/:id", updateCn);

module.exports = cnRouter;
