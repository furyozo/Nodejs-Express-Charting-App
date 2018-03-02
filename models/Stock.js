var yahooFinance = require('yahoo-finance');

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
       if (err) callback(err)
       else callback(null, stock);
     });
   }
 });

}

/**
 * get single stock in chartable format
 * @param  {Function} callback callback function
 */
 StockSchema.statics.getChartableStock = function (name, callback) {
   // create new empty object
   var stockObj = {
     label: '',
     data: '',
     borderColor: 'blue',
     fill: false
   };
   // get the stock name
   yahooFinance.quote({
     symbol: name
   }, function (err, quote) {
     // get historical stock data for quotes and stock code
     yahooFinance.historical({
       symbol: name,
       from: '2017-01-01',
       to: new Date().toISOString().slice(0,10),
       period: 'm' // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
     }, function (err, quotes) {
       if (err) console.error(err);
       else if (quotes.length === 0) console.error("stock does not exist");
       else {
         stockObj.label = quote.price.longName;
         stockObj.data = quotes.map(obj => obj.close);
         return callback(stockObj);
       }
     });
   });
 }

/**
 * get all stocks in chartable format
 * @param  {Function} callback callback function
 */
StockSchema.statics.getChartableStocks = function(callback) {
  var Stock = this;
  var arr = [];
  Stock.find({}, function(err, stocks) {
    if (err) console.error(err);
    for (var i = 0; i < stocks.length; i++) {
      Stock.getChartableStock(stocks[i].name, function(stockObj) {
        arr.push(stockObj);
        if (arr.length === stocks.length) callback(arr);
      });
    }
  })
}

module.exports = mongoose.model('Stock', StockSchema);
