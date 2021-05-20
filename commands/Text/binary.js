const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'binary',
    description: 'Encode or decode!',
    aliases: [],
    category: 'Text',
    usage: '<Encode/Decode> <Message/Binary>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.lineReply("Please Specify Whether You want to encode or decode!")

        const query = args.shift().toLowerCase();
        let word = args.join(" ");

        if (query === 'encode') {
            if (!word) return message.lineReply("Please Specify a Word To Encode!");
            const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`);

            message.channel.send(data.binary ?? "An Error Occured", {
                code: "",
            });
        } else if (query === 'decode') {
            if (!word) return message.lineReply('please specify a binary to decode.');
            const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`);

            message.channel.send(data.text ?? "An error Occured", {
                code: "",
            })
        } else return message.lineReply('That Option isnt valid! Use `decode` or `encode`!')
    }
}