const { default: axios } = require('axios');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'urban',
    description: 'Search the Web!',
    aliases: ['search', 'google'],
    category: 'Utility',
    usage: '<Search>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let query = args.join(' ')
        if (!query) return message.reply('Specify a Search Result!')

        query = encodeURIComponent(query);

        const { data: { list }} = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`);

        let [ answer ] = list;

        message.channel.send(
            new MessageEmbed()
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .setColor('RANDOM')
            .addField("DEFINITION", trim(answer.definition))
            .addField('EXAMPLE', trim(answer.example))
            .setFooter(`${answer.thumbs_up} 👍 | ${answer.thumbs_down}`)
        )
    },
};

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ...` : input
}