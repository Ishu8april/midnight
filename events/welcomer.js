const client = require('../index')
const Schema = require('../models/welcomeChannel')
const canvas = require('discord-canvas')
const { MessageAttachment } = require('discord.js')

client.on("guildMemberAdd", async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;
        const user = member.user;
        const image = new canvas.Welcome()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setColor("border", "#00FF17")
            .setColor("username-box", "#00FF17")
            .setColor("discriminator-box", "#00FF17")
            .setColor("message-box", "#00FF17")
            .setColor("title", "#00FF17")
            .setColor("avatar", "#00FF17")
            .setBackground('https://media.discordapp.net/attachments/842712275869368331/844123440029499434/Landscape-Color.png?width=1024&height=425')
            .toAttachment();

            const attachment = new MessageAttachment((await image).toBuffer(), "welcome-image.png");

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send(attachment)
    })
})

client.on("guildMemberRemove", async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;
        const user = member.user;
        const image = new canvas.Goodbye()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setColor("border", "#FF0000")
            .setColor("username-box", "#FF0000")
            .setColor("discriminator-box", "#FF0000")
            .setColor("message-box", "#FF0000")
            .setColor("title", "#FF0000")
            .setColor("avatar", "#FF0000")
            .setBackground('https://media.discordapp.net/attachments/842712275869368331/844123440029499434/Landscape-Color.png?width=1024&height=425')
            .toAttachment();

            const attachment = new MessageAttachment((await image).toBuffer(), "welcome-image.png");

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send(attachment)
    })
})