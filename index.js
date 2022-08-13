require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


// middleware para ter acesso a ao req.body em post!
app.use(express.urlencoded({extended: false}))


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// original_url and short_url 

let listaUrl = {}
let num = 1

// parte 1
app.post('/api/shorturl',(req,res) => {

  const {url} = req.body
  
  // se a url n comecar com 'http' sera invalida!
  if(!url.startsWith('http'))
  {
    return res.json({error:'invalid url'})
  }

  // criando chave(num) e valor(url) para adicional a variavel (listaUrl)
  listaUrl[num] = url


  
  res.status(200).json({original_url:url, short_url:num})

  num ++;

})

// parte 2
app.get('/api/shorturl/:short_url', (req,res) => {

  const {short_url} = req.params

  res.redirect(urlList[short_url])

})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
