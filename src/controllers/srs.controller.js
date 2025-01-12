const Srs = require("../models/srs.model");

const newSrs = async (req, res) => {
  const { id, srs_name, description, location, imgUrl } = req.body;

  try {
    const existingSrs = await Srs.findOne({ srs_name });

    if (existingSrs) {
      return res.status(400).json({ error: "Subject already exists" });
    }

    const srs = new Srs({ id, srs_name, description, location, imgUrl });
    await srs.save();

    res.status(201).json({ message: "srs registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllSrss = async (req, res) => {
  try {
    const srss = await Srs.find();
    res.status(200).json(srss);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSrs = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteSrs = await Srs.findOneAndDelete({ id: id });
    if (!deleteSrs) {
      return res.status(404).send({ message: "srs not found" });
    }
    res.status(200).send({ message: "srs deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting srs", error });
  }
};

// const updateSrs = async (req, res) => {
//   const { id, srs_name, description, location, imgUrl } = req.body;

//   try {
//     const srs = await Srs.findOne({ id: id });
//     if (!srs) {
//       return res.status(404).json({ message: "srs not found" });
//     }

//     if (srs_name !== undefined) srs.srs_name = srs_name;
//     if (description !== undefined) srs.description = description;
//     if (location !== undefined) srs.location = location;
//     if (imgUrl !== undefined) srs.imgUrl = imgUrl;

//     const updatedSrs = await srs.save();

//     res.status(200).json({
//         message: "SRS updated successfully",
//         updatedSrs,
//       });
//         } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const updateSrs = async (req, res) => {
    const { srs_name, description, location, imgUrl } = req.body;
  
    try {
      const srs = await Srs.findById(req.params.id);
      if (!srs) {
        return res.status(404).json({ message: "SRS not found" });
      }
  
      if (srs_name !== undefined) srs.srs_name = srs_name;
      if (description !== undefined) srs.description = description;
      if (location !== undefined) srs.location = location;
      if (imgUrl !== undefined) srs.imgUrl = imgUrl;
  
      const updatedSrs = await srs.save();
  
      res.status(200).json({
        message: "SRS updated successfully",
        updatedSrs,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = { newSrs, getAllSrss, deleteSrs, updateSrs };
