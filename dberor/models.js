const mongoose = require("mongoose");


/////////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
let dbURI = "mongodb+srv://faiz:2468@mundodb.lkd4g.mongodb.net/ttest?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    role: { "type": String, "default": "user" },
    createdOn: { type: Date, 'default': Date.now },
    activeSince: Date,
    profileUrl: String,
});
var getUser = mongoose.model("users", userSchema);


// =======================export
var otpSchema = new mongoose.Schema({
    "email": String,
    "otpCode": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("otps", otpSchema);

// =======================export

// productname: productname.current.value,
// price: price.current.value,
// stock: stock.current.value,
// description: description.current.value,
// imgUrl: img.current.value,

var tweetSchema = new mongoose.Schema({
    // name: String,
    name: String,
    email: String,
    profileUrl: String,
    productKey: String,
    price: String,
    stock: String,
    description: String,
    productname: String,
    imgUrl: String,
    createdOn: { type: Date, 'default': Date.now },
    // activeSince: Date,

});
var tweet = mongoose.model("tweet", tweetSchema);

var picSchema = new mongoose.Schema({
    // name: String,
    email: String,
    profileUrl: String,
    createdOn: { type: Date, 'default': Date.now },
    // activeSince: Date,

});
var profilepic = mongoose.model("pic", picSchema);
// ======================>

var orderSchema = mongoose.Schema({
    orderscart: Array,
    totalPrice: String,
    email: String,
    name: String,
    phonenumber: String,
    address: String,
    status: String,
    remarks: String,
    "createdOn": { "type": Date, "default": Date.now },
})

var order = mongoose.model("order", orderSchema);

// =======================export
var userProductSchema = new mongoose.Schema({
    // name: String,
    name: String,
    email: String,
    productKey: String,
    profileUrl: String,
    price: String,
    stock: String,
    description: String,
    productname: String,
    imgUrl: String,
    createdOn: { type: Date, 'default': Date.now },
    // activeSince: Date,

});
var userProduct = mongoose.model("userProduct", userProductSchema);
// =======================export
// =======================export

module.exports = {
    getUser: getUser,
    otpModel: otpModel,
    tweet: tweet,
    profilepic: profilepic,
    order: order,
    userProduct: userProduct,
}


