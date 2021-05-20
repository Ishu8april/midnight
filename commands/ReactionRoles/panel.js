const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/rr');

module.exports = {
    name: 'panel',
    description: 'Setup the ReactionRole Panel',
    aliases: ['rrpanel'],
    category: 'Reaction Roles',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (!data) return message.lineReply('You havent setup any ReactionRoles! Use the `rradd` Command!')

            const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = message.guild.roles.cache.get(data.Roles[value][0]);
                    return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`
                }).join("\n\n");

            channel.send(new MessageEmbed().setDescription(mapped)).then((msg) => {
                data.Message = msg.id;
                data.save();

                const reactions = Object.values(data.Roles).map((val) => val[1].id);
                reactions.map((emoji) => msg.react(emoji));
            })
        })
    },
};