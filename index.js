const express = require('express')
const _ = require('lodash')
const morgan = require('morgan')
const async = require('async');
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
  let tab = Array(parseInt(req.params.id))
  //Array(parseInt(req.params.id))
  let average = 0
  let number = 0
  /*for (let i = 0; i <= req.params.id; i++) {
    let user = {
      id: i,
      name: "Héritier " + i,
      firstName: "Julien " + i,
      age: 20 + i
    }
    tab.push(user)
    //average += user.age
  }*/

  async.forEachOf(tab, function (value, i, callback) {
    if ((i + 20)%3 == 0) return callback()
    if ((i + 20)%2 == 0) {
      tab[i] = {
        id: i,
        name: "Héritier " + i,
        firstName: "Julien " + i,
        age: 20 + i
      }
    }
    callback()
  }, function (err) {
      //res.json(_.filter(tab, function(o) { return o != null }))
      //res.json(_.minBy(tab, 'age'))

      async.parallel({
          min: function(callback) {
            min = _.minBy(tab, 'age')
            callback(null, min)
          },
          max: function(callback) {
            max = _.maxBy(tab, 'age')
            callback(null, max)
          },
          average: function(callback) {
            average = parseInt((_.sumBy(tab, 'age')) / tab.length)
            callback(null, average)
          }
      }, function(err, results) {
          res.json({
            "min": results.min,
            "max": results.max,
            "average": results.average
          })
          console.log(average)
      });


      //res.json(_.maxBy(tab, 'age'))
      //average = parseInt((_.sumBy(tab, "age")) / tab.length)
  })
  //average = average / tab.length
  //res.json({"average": average})
  //console.log(average);
})

app.use(morgan('combined'))
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
console.log('Coucou!');
