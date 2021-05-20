const { Client, Message, MessageEmbed, Util } = require('discord.js');
const Schema = require('../../models/rr')

module.exports = {
    name: 'rradd',
    description: 'Add a Reaction Role',
    aliases: ['reactionroleadd', 'addrr'],
    usage: '<@role/roleid> <emoji>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const role = message.mentions.roles.first()
        if (!role) return message.lineReply('You did not Specify a Valid role / role id.');

        let [, emoji] = args;
        if (!emoji) return message.lineReply('The correct Syntax is `m!rradd <Role/roleid> <emoji>');

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji
                            },
                        ],
                    },
                }).save();
            }
            message.channel.send('New Role Added')
        });
    },
};