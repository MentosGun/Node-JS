const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

/*app.get('/toto', function(req, res) {
  res.json({"user": req.query.user})
})*/

/*app.get('/toto/:id([0-9]{3,})', function(req, res) {
  res.json({"user": req.params.id})
})*/

app.get('/:id([0-9]{1,})', function(req, res) {
  let tab = []
  for (var i = 0; i <= req.params.id; i++) {
    let user = {
      id: i,
      name: "Héritier " + i,
      firstName: "Julien " + i,
      age: 20 + i
    }
    tab.push(user)
  }
  res.json({tab})
  console.log("Réussi");
})

app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
console.log('Coucou!');
