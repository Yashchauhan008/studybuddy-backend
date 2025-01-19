const express = require("express");
const csRouter = express.Router();
const { newCs, getAllCss, deleteCs, updateCs } = require("../controllers/cs.controller");

csRouter.post("/add", newCs);
csRouter.get("/all", getAllCss);
csRouter.delete("/delete", deleteCs);
csRouter.put("/:id", updateCs);

module.exports = csRouter;
