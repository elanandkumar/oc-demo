const express = require('express');
const server = express();
const request = require('request');
const Client = require('oc-client');

server.set('view engine', 'ejs');
server.use(express.static('public'));

const client = new Client({
  registries: {
    serverRendering: 'http://127.0.0.1:3030',
    clientRendering: 'http://127.0.0.1:3030'
  },
  components: {
    'header': '~1.0.0',
    'header-react': '~1.0.0'
  }
})

server.get('/', (req, res) => {
  const components = [
    {
      name: 'header',
      render: 'server' // this can be set to 'client' for client render. 'server' is default
    },{
      name: 'header-react',
      parameters: {bgcolor: 'green'}
    }
  ];
  /* for client side rendering */
  // client.renderComponents(components, {render: 'client'}, (err, htmls) => {
  /* for server side rendering */
  client.renderComponents(components, (err, htmls) => {
    if(err) {
      console.error('errors: ', err);
    }
    const model = {
      component1: htmls[0],
      component2: htmls[1]
    };
    res.render('index', model);
  })
})

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Homepage listening on port ${port}`);
});
