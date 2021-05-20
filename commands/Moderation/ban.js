module.exports = {
    name: 'ban',
    description: 'Bans a User From the Server!',
    category: 'Moderation',
    usage: '<@User>',
    run : async(client, message, args) => {
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I dont have the \`BAN_MEMBERS\` Permission!');

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!Member) return message.channel.send('Please Specify a member to ban!');

        await Member.ban({ reason: args.slice(1).join(" ")})
        await Member.send(`You Were Banned in **${message.guild.name}** For the Reason: ${args.slice(1).join(" ")}`).catch(err => console.log(err)).then(message.channel.send('I was Unable to Dm the user.'));
        await message.channel.send(`Successfully Banned ${Member.user.tag} From ${message.guild.name}!`)
    }
}