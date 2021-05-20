const client = require('../index')
const ms = require('ms')
const Schema = require('../models/membercount')

client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`)

    const arrayOfStatus = [
        `Watching ${client.guilds.cache.size} Servers!`,
        `Running Commands for ${client.users.cache.size} People!`,
        `Looking After ${client.channels.cache.size} Channels!`,
        `Run m!help`,
    ];

    let index = 0;
    setInterval(() => {
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status);
        index++;
    }, 5000)

    setInterval(() => {
        Schema.find().then((data) => {
            if (!data && data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const memberCount = guild.memberCount;

                if (value.Member != memberCount) {
                    const channel = guild.channels.cache.get(value.Channel);
                    channel.setName(`Members: ${memberCount}`);

                    value.Member = memberCount;
                    value.save();
                }
            });
        });
    }, ms("5 seconds"))
});