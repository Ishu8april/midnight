const { Collection, Client } = require('discord.js')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const fs = require('fs')
require('discord-reply')
const client = new Client({
    disableMentions: "everyone",
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"]
});
const config = require('./config.json')
module.exports = client;
const prefix = config.prefix
const token = config.token

const uri = config.mongo_uri
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db!'))


client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.login(token)
