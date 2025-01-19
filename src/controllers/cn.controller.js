const Cn = require("../models/cn.model");

const newCn = async (req, res) => {
  const { id, cn_name, description, location, imgUrl } = req.body;

  try {
    const existingCn = await Cn.findOne({ cn_name });

    if (existingCn) {
      return res.status(400).json({ error: "Cn already exists" });
    }

    const cn = new Cn({ id, cn_name, description, location, imgUrl });
    await cn.save();

    res.status(201).json({ message: "Cn registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCns = async (req, res) => {
  try {
    const cns = await Cn.find();
    res.status(200).json(cns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCn = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteCn = await Cn.findOneAndDelete({ id: id });
    if (!deleteCn) {
      return res.status(404).send({ message: "Cn not found" });
    }
    res.status(200).send({ message: "Cn deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Cn", error });
  }
};

const updateCn = async (req, res) => {
  const { cn_name, description, location, imgUrl } = req.body;

  try {
    const cn = await Cn.findById(req.params.id);
    if (!cn) {
      return res.status(404).json({ message: "Cn not found" });
    }

    if (cn_name !== undefined) cn.cn_name = cn_name;
    if (description !== undefined) cn.description = description;
    if (location !== undefined) cn.location = location;
    if (imgUrl !== undefined) cn.imgUrl = imgUrl;

    const updatedCn = await cn.save();

    res.status(200).json({
      message: "Cn updated successfully",
      updatedCn,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { newCn, getAllCns, deleteCn, updateCn };
