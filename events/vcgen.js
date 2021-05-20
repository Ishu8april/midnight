const client = require('../index');
const { Collection } = require('discord.js');
const { voice } = require('../index');
const voiceCollection = new Collection();

client.on("voiceStateUpdate", async (oldstate, newstate) => {
    const user = await client.users.fetch(newstate.id);
    const member = newstate.guild.member(user);

    if (!oldstate.channel && newstate.channel.id === '843777189002215454') {
        const channel = await newstate.guild.channels.create(`${user.username} Private`, {
            type: 'voice',
            parent: newstate.channel.parent,
            userLimit: 2,
        });
        channel.overwritePermissions([
            {
               id: user.id,
               allow: ['VIEW_CHANNEL', 'PRIORITY_SPEAKER', 'MOVE_MEMBERS'],
            }
          ], 'Private VC')
        member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id)
    } else if(!newstate.channel) {
        if (oldstate.channelID === voiceCollection.get(newstate.id)) return oldstate.channel.delete()
    }
})