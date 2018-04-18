const express = require('express');
const server = express();
const request = require('request');

server.set('view engine', 'ejs');
server.use(express.static('public'));
server.get('/', (req, res) =>
  {
    console.log(">>>>", req.url);
    return Promise.all([
      getContents('http://192.168.1.9:3030/name-generator-react/1.0.0/?name="Server side rendered"&bgcolor=green'),
      getContents('http://192.168.1.9:3030/name-generator/1.0.0/'),
    ]).then(responses =>{
      res.render('index', { component1: JSON.parse(responses[0]).html, component2: JSON.parse(responses[1]).html })
    }
    ).catch(error =>
      res.send(error.message)
    )
  }
);

const getContents = (url) => new Promise((resolve, reject) => {
  request.get(url, (error, response, body) => {
    if (error) return resolve("Error loading " + url + ": " + error.message);

    return resolve(body);
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});
