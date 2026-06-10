const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, deletePost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);

module.exports = router;
