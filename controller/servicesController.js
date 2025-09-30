const Services = require("../model/Services");

exports.addServices = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    let image;
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    const services = new Services({ image, title, paragraph });
    await services.save();
    res.status(201).json({ message: "Services added successfully" });
  } catch (error) {
    console.error("Error adding services:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Services.find().sort({ creaditedAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph } = req.body;
    let image;
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    const updatedData = { title, paragraph };
    if (image) {
      updatedData.image = image;
    }
    const updatedServices = await Services.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Services updated succcessfully", updatedServices });
  } catch (error) {
    console.error("Error updating services:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteServices = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedServices = await Services.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Services deleted successfully", deletedServices });
  } catch (error) {
    console.error("Error deleting services:", error);
    res.status(500).json({ messae: error.messae });
  }
};
