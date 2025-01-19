const Cs = require("../models/cs.model");

const newCs = async (req, res) => {
  const { id, cs_name, description, location, imgUrl } = req.body;

  try {
    const existingCs = await Cs.findOne({ cs_name });

    if (existingCs) {
      return res.status(400).json({ error: "Cs already exists" });
    }

    const cs = new Cs({ id, cs_name, description, location, imgUrl });
    await cs.save();

    res.status(201).json({ message: "Cs registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCss = async (req, res) => {
  try {
    const css = await Cs.find();
    res.status(200).json(css);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCs = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteCs = await Cs.findOneAndDelete({ id: id });
    if (!deleteCs) {
      return res.status(404).send({ message: "Cs not found" });
    }
    res.status(200).send({ message: "Cs deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Cs", error });
  }
};

const updateCs = async (req, res) => {
  const { cs_name, description, location, imgUrl } = req.body;

  try {
    const cs = await Cs.findById(req.params.id);
    if (!cs) {
      return res.status(404).json({ message: "Cs not found" });
    }

    if (cs_name !== undefined) cs.cs_name = cs_name;
    if (description !== undefined) cs.description = description;
    if (location !== undefined) cs.location = location;
    if (imgUrl !== undefined) cs.imgUrl = imgUrl;

    const updatedCs = await cs.save();

    res.status(200).json({
      message: "Cs updated successfully",
      updatedCs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { newCs, getAllCss, deleteCs, updateCs };
