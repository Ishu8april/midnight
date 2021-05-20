module.exports = {
    name: 'kick',
    description: 'Kicks a User From the Server!',
    usage: '<@User>',
    category: 'Moderation',
    run : async(client, message, args) => {
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I dont have the \`KICK_MEMBERS\` Permission!');

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!Member) return message.channel.send('Please Specify a member to kick!');

        await Member.kick({ reason: args.slice(1).join(" ")})
        await Member.send(`You Were Kicked in **${message.guild.name}** For the Reason: ${args.slice(1).join(" ")}`).catch(err => console.log(err)).then(message.channel.send('I was Unable to Dm the user.'));
        await message.channel.send(`Successfully Kicked ${Member.user.tag} From ${message.guild.name}!`)
    }
}