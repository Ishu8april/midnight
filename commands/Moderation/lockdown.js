const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lockdown',
    description: 'OMG SERVER GONNA GET RAIDED AAAAAAAAAAAAAAAAAA',
    aliases: [],
    category: 'Moderation',
    usage: '<Status>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`you can't use this command son`);

        const role = message.guild.roles.cache.get('812257490724847664') 

        if(!args.length) return message.reply(`Please specify a query!`);
        
        const query = args[0].toLowerCase()

        if(!['true', 'false'].includes(query)) return message.lineReplyNoMention(`The option you have stated is not valid.`);

        const perms = role.permissions.toArray();
        if(query === "false") {
            perms.push('SEND_MESSAGES');
            console.log(perms)
            await role.edit({ permissions: perms })
            message.channel.send("Server is now unlocked!")
        } else {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            console.log(newPerms);

            await role.edit({ permissions: newPerms });
            message.channel.send("Server is now in lockdown!")
    }
}
}