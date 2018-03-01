const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')
const db = mongoose.connection
const Schema = mongoose.Schema

/**
 * establish and check db connection
 */
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => { console.log('db connection established') })

var StockSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

/**
 * add a new stock
 * @param  {string}   name     name of the
 * @param  {Function} callback callback function
 */
StockSchema.statics.add = function (name, callback) {

 // create a new database-inputtable object
 var stockData = {
   name: name
 }

 var Stock = this
 // check if stock already exist
 Stock.findOne({ 'name': name }, function (err, stock) {
   if (err) return callback(err)
   else if (stock) {
     var err = new Error('stock already exists');
     err.status = 401;
     return callback(err);
   }
   // use schema.create to insert data into the db
   else {
     Stock.create(stockData, function (err, stock) {
       if (err) {
         callback(err)
       } else {
         callback(null, stock);
       }
     });
   }
 });

}

module.exports = mongoose.model('Stock', StockSchema);
