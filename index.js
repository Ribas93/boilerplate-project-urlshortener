require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


// middleware to handle post body
app.use(express.urlencoded({extended: false}))


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



// original_url and short_url

let urlList = {}
let short_url = 1

app.post('/api/shorturl',(req,res) => {

  const {url} = req.body
  
  urlList[short_url] = url

/*dns.lookup('www.google.com', err => {
  if(err)
  {
    console.log(err)
  }

})*/



res.status(200).json({original_url: url, short_url:short_url})

short_url ++;

console.log(urlList)


})

app.get('/api/shorturl/:short_url', (req,res) => {

  const {short_url} = req.params

  
  res.redirect(urlList[short_url])

})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
