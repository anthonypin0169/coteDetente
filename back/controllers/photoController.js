const Photo = require('../models/Photo');

exports.getPhotosByCategory = async (req, res) => {
  try {
    const photos = await Photo.find({ category: req.params.category });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucun fichier reçu' });

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const photo = await Photo.create({ ...req.body, url });
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
