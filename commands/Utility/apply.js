const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'apply',
    description: 'Apply For Staff!',
    aliases: [],
    category: 'Utility',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
    const questions = [
        "What position are you applying for?",
        "What is your discord username?",
        "How old are you?",
        "What timezone are you in? (Google is your friend.)",
        "How many days per week can you be active?",
        "How many hours per day can you be active?",
        "Do you have any previous experience? If so, please describe.",
        "Why do y   ou want to be a member of our staff?"
    ];
    message.reply('I have sent you a DM!')
    let collectCounter = 0;
    let endCounter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);



    collector.on("collect", () => {
        if(collectCounter < questions.length) {
            channel.send(questions[collectCounter++])
        } else {
            channel.send('Your application has been send to the staff!')
            collector.stop("fulfilled")
        }
    });
    const applychannel = client.channels.cache.get('842712275869368331');
    if(!applychannel) return message.reply(`Please use this command in the correct channel!`)
    const appsChannel = client.channels.cache.get('842706534336823297');    
    collector.on('end', (collected, reason) => {
        if(reason === 'fulfilled') {
            let index = 1;
            const mappedResponses = collected
            .map((msg) => {
                return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
            })
            .join('\n\n');
        
        appsChannel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle('New Application!')
            .setDescription(mappedResponses)
            .setColor('BLUE')
            .setTimestamp()
        )
        }
    })
}
}   