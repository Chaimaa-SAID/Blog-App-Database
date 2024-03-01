const express = require('express');
const postController = require('../controllers/postController');
const ensureToken = require('../middlewares/authenticateToken');
const router = express.Router();
router.use(express.json())
router.use(ensureToken);
router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
