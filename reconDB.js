const client = require("./index");

const { reconDB } = require('reconlx')

const db = new reconDB(client, {
    uri: 'mongodb+srv://Ishu8april:B9nyGBtUJMgzaAJD@cluster0.a04ce.mongodb.net/djs?retryWrites=true&w=majority'
})

module.exports = db;