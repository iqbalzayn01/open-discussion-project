const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/threads', index);

router.get('/threads/:id', find);

router.post('/threads', create);

router.put('/threads/:id', update);

router.delete('/threads/:id', destroy);

module.exports = router;
