const Photo = require('../models/photo');
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

    const url = `/uploads/${filename}`;
    const photo = await Photo.create({ ...req.body, url });
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
      const oldFilename = path.basename(photo.url);
      const oldPath = path.join('uploads', oldFilename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.avif`;
      const outputPath = path.join('uploads', filename);
      await sharp(req.file.buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 60 })
        .toFile(outputPath);
      photo.url = `/uploads/${filename}`;
    }

    if (req.body.title !== undefined) photo.title = req.body.title;
    if (req.body.description !== undefined) photo.description = req.body.description;
    if (req.body.dates !== undefined) photo.dates = req.body.dates;
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

    const filename = path.basename(photo.url);
    const filepath = path.join('uploads', filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    await photo.deleteOne();
    res.json({ message: 'Photo supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
