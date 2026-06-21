const Photo = require('../models/Photo');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`;
    const outputPath = path.join('uploads', filename);

    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .avif({ quality: 60 })
      .toFile(outputPath);

    const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    const photo = await Photo.create({ ...req.body, url });
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo introuvable' });

    const filename = path.basename(photo.url);
    const filepath = path.join('uploads', filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    await photo.deleteOne();
    res.json({ message: 'Photo supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
