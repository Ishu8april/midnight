const client = require('../index')
const blacklist = require('../models/blacklist')
require('dotenv').config()
const prefix = process.env.prefix
const db = require('../reconDB')

client.on('message', async message => {
    if (message.author.bot) return;
    if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = await db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.lineReply(`I have Removed Your AFK:  ${info}`)
    }
    if (message.mentions.members.first()) {
        if (
            await db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
        ) {
            message.channel.send(
                message.mentions.members.first().displayName +
                " Is AFK: " +
                (await db.get
                    (`afk-${message.mentions.members.first().id}+${message.guild.id}`
                    ))
            );
        } else return;
    } else;
    if (message.mentions.users.first()) {
        if (message.mentions.users.first().id === '839479396158799932') return message.channel.send('Hi, My Prefix is `m!`.')
    }
    if (!message.content.startsWith(prefix)) return;
    blacklist.findOne({ id: message.author.id }, async (err, data) => {
        if (err) throw err;
        if (!data) {
            if (!message.guild) return;
            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) return;
            let command = client.commands.get(cmd)
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) {
                command.run(client, message, args)

                const channel = client.channels.cache.get('842705755488780288')

                channel.send(`**${message.author.tag}** has Used **${command.name}** Command in **${message.guild.name}!**`)
            }
        } else {
            message.channel.send('You are blacklisted!')
        }
    })

})