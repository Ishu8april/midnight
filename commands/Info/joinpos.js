const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "position",
  category: 'Info',
  description: 'Tells You the Position You joined the Server at!',
  aliases: ['joinpos', 'pos', 'jp'],
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.author;

    if (!member) return message.reply("Please specify a member!");

    const members = message.guild.members.cache
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    const embed = new MessageEmbed()
    .setTitle(`Join Position`)
    .setDescription(`${member} is the  ${await position} Member Who Joined the Server! ✨`)
    .setColor('RANDOM')
    .setFooter('Made By Ishu8april#9339')
    message.channel.send(
      embed
    );
  },
};