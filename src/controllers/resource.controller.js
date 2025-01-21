const Resource = require("../models/resource.model"); // Assuming you renamed the model to Resource

// Create a new resource (either Srs or Py)
const newResource = async (req, res) => {
  const { id, name, description, location, imgUrl, resource } = req.body;

  try {
    const existingResource = await Resource.findOne({ name });

    if (existingResource) {
      return res.status(400).json({ error: "Resource already exists" });
    }

    const resourceDoc = new Resource({ id, name, description, location, imgUrl, resource });
    await resourceDoc.save();

    res.status(201).json({ message: "Resource registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all resources (Srs, Py, etc.)
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a resource by ID
const deleteResource = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedResource = await Resource.findOneAndDelete({ id: id });
    if (!deletedResource) {
      return res.status(404).send({ message: "Resource not found" });
    }
    res.status(200).send({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting resource", error });
  }
};

// Update a resource by ID
const updateResource = async (req, res) => {
  const { name, description, location, imgUrl, resource } = req.body;

  try {
    const resourceDoc = await Resource.findById(req.params.id);
    if (!resourceDoc) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (name !== undefined) resourceDoc.name = name;
    if (description !== undefined) resourceDoc.description = description;
    if (location !== undefined) resourceDoc.location = location;
    if (imgUrl !== undefined) resourceDoc.imgUrl = imgUrl;
    if (resource !== undefined) resourceDoc.resource = resource;

    const updatedResource = await resourceDoc.save();

    res.status(200).json({
      message: "Resource updated successfully",
      updatedResource,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getResourcesByType = async (req, res) => {
  const { resourceType } = req.params; // The resource type (e.g., Srs, Py)

  try {
    const resources = await Resource.find({ resource: resourceType });

    if (resources.length === 0) {
      return res.status(404).json({ message: `No resources found for type: ${resourceType}` });
    }

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { newResource, getAllResources, deleteResource, updateResource, getResourcesByType };
