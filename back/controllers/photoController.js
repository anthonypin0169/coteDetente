const Photo = require('../models/photo');
const { saveResponsiveImage, deleteResponsiveImage } = require('../utils/imagePipeline');

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

    const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1200 });

    const photo = await Photo.create({ ...req.body, url: image.url, srcSet: image.srcSet });
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo introuvable' });

    if (req.file) {
      deleteResponsiveImage(photo.url, photo.srcSet);
      const image = await saveResponsiveImage(req.file.buffer, { maxWidth: 1200 });
      photo.url = image.url;
      photo.srcSet = image.srcSet;
    }

    if (req.body.title !== undefined) photo.title = req.body.title;
    if (req.body.description !== undefined) photo.description = req.body.description;
    if (req.body.dates !== undefined) photo.dates = req.body.dates;
    if (req.body.photoAlt !== undefined) photo.photoAlt = req.body.photoAlt;
    if (req.body.textColor !== undefined) photo.textColor = req.body.textColor;
    if (req.body.textPositions !== undefined) {
      try {
        photo.textPositions = JSON.parse(req.body.textPositions);
      } catch {
        return res.status(400).json({ message: 'textPositions doit être un JSON valide' });
      }
    }

    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo introuvable' });

    deleteResponsiveImage(photo.url, photo.srcSet);

    await photo.deleteOne();
    res.json({ message: 'Photo supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
