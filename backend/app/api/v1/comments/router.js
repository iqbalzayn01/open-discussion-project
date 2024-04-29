const express = require('express');
const router = express();
const { create, index, update, destroy } = require('./controller');

router.get('/threads/:id/comments', index);

router.post('/threads/:id/comments', create);

router.put('/threads/:id/comments', update);

router.delete('/threads/:id/comments', destroy);

module.exports = router;
