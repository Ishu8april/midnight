const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset",
  category: 'Moderation',
  description: 'Resets The Nickname of a user!',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || args[0]

    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};