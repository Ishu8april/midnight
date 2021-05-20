const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/membercount');

module.exports = {
    name: 'setmembercount',
    description: 'Set Member Count Channel',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) data.delete();

            const channel = await message.guild.channels.create(
                `Members: ${message.guild.memberCount}`,
                {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["CONNECT"],
                        },
                    ],
                }
            );
            message.channel.send(`Successfully Created the Channel! <#${channel.id}>`)

            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
                Member: message.guild.memberCount,
            }).save()
        });
    },
};