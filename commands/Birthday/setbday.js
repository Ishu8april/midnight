const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/bday')

module.exports = {
    name: 'setbday',
    description: 'Set Your Birthday!',
    aliases: ['setbirthday'],
    category: 'Birthday',
    usage: '<Date>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };

        const joined = args.join(" ");
        const split = joined.trim().split("/");

        let [ day, month ] = split;

        if (!day) return message.lineReply('Please give a day! Example - `m!setbday 5/12`')
        if (!month) return message.lineReply('Please give a month! Example - `m!setbday 5/12`')

        if (isNaN(day) || isNaN(month)) return message.lineReply('You have entered an invalid date! Example - `m!setbday 5/12`')

        day = parseInt(day)
        month = parseInt(month)

        if (!day || day > 31) return message.lineReply('Wrong Day Format. Example - `m!setbday 5/12`')
        if (!month || month > 12) return message.lineReply('Wrong Month Format. Example - `m!setbday 5/12`')

        const convertedDate = suffixes(day);
        const convertedMonth = months[month]
        const bday = `${convertedDate} of ${convertedMonth}`
        Schema.findOne({ User: message.author.id }, async(err, data) => {
            if (data) {
                data.Birthday = bday;
                data.save()
            } else {
                new Schema({
                    User: message.author.id,
                    Birthday: bday,
                }).save();
            }
        })
        message.channel.send(`Saved Your Birthday at ${bday} 🥳🥳`)

    },
};
/**
 * @param {Number} number
 */
function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
     `${converted}st`: lastChar == "2" ?
      `${converted}nd` : lastChar == '3' 
       ?`${converted}`  : `${converted}th`
}