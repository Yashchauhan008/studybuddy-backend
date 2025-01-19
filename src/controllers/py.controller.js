const Py = require("../models/py.model");

const newPy = async (req, res) => {
  const { id, py_name, description, location, imgUrl } = req.body;

  try {
    const existingPy = await Py.findOne({ py_name });

    if (existingPy) {
      return res.status(400).json({ error: "Py already exists" });
    }

    const py = new Py({ id, py_name, description, location, imgUrl });
    await py.save();

    res.status(201).json({ message: "Py registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPys = async (req, res) => {
  try {
    const pys = await Py.find();
    res.status(200).json(pys);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePy = async (req, res) => {
  const { id } = req.body;
  try {
    const deletePy = await Py.findOneAndDelete({ id: id });
    if (!deletePy) {
      return res.status(404).send({ message: "Py not found" });
    }
    res.status(200).send({ message: "Py deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Py", error });
  }
};

const updatePy = async (req, res) => {
  const { py_name, description, location, imgUrl } = req.body;

  try {
    const py = await Py.findById(req.params.id);
    if (!py) {
      return res.status(404).json({ message: "Py not found" });
    }

    if (py_name !== undefined) py.py_name = py_name;
    if (description !== undefined) py.description = description;
    if (location !== undefined) py.location = location;
    if (imgUrl !== undefined) py.imgUrl = imgUrl;

    const updatedPy = await py.save();

    res.status(200).json({
      message: "Py updated successfully",
      updatedPy,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { newPy, getAllPys, deletePy, updatePy };
