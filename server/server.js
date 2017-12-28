import Pages from './pages.js';

import express from 'express';
import bodyParser from 'body-parser';

var server = express()
server.use(bodyParser.json())

server.get('/new_url', Pages.new_url)
server.get('/url', Pages.get)

server.post('/add', Pages.add)
server.post('/check', Pages.check)

server.listen(3001)
