const Ml = require("../models/ml.model");

const newMl = async (req, res) => {
  const { id, ml_name, description, location, imgUrl } = req.body;

  try {
    const existingMl = await Ml.findOne({ ml_name });

    if (existingMl) {
      return res.status(400).json({ error: "Ml already exists" });
    }

    const ml = new Ml({ id, ml_name, description, location, imgUrl });
    await ml.save();

    res.status(201).json({ message: "Ml registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllMls = async (req, res) => {
  try {
    const mls = await Ml.find();
    res.status(200).json(mls);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMl = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteMl = await Ml.findOneAndDelete({ id: id });
    if (!deleteMl) {
      return res.status(404).send({ message: "Ml not found" });
    }
    res.status(200).send({ message: "Ml deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Ml", error });
  }
};

const updateMl = async (req, res) => {
  const { ml_name, description, location, imgUrl } = req.body;

  try {
    const ml = await Ml.findById(req.params.id);
    if (!ml) {
      return res.status(404).json({ message: "Ml not found" });
    }

    if (ml_name !== undefined) ml.ml_name = ml_name;
    if (description !== undefined) ml.description = description;
    if (location !== undefined) ml.location = location;
    if (imgUrl !== undefined) ml.imgUrl = imgUrl;

    const updatedMl = await ml.save();

    res.status(200).json({
      message: "Ml updated successfully",
      updatedMl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { newMl, getAllMls, deleteMl, updateMl };
