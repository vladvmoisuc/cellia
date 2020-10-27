const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const service = axios.create({
  baseURL: 'https://api.typingdna.com',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization:
      'Basic MDUxYjNmYjRlZDYyOWYxNGQ5ZjY2ZmViOWEwZDU5NjA6YzZmNDc3MmExMTg2NzU3NmQyYzQ0ZWZjZmMxMmU3NmE',
  },
});

axios.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/save/:id', async (req, res) => {
  try {
    const response = await service.post(`/save/${req.params.id}`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(response.data);
    console.log('Error: ', error.response);
  }
});

app.post('/verify/:id', async (req, res) => {
  try {
    const response = await service.post(`/verify/${req.params.id}`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send('Not working.');
    console.log('Error: ', error.response);
  }
});

const port = 3001;

app.listen(port, function () {
  console.log('Listening on port... ', port);
});
