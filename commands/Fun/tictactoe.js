const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    category: 'Fun',
    description: 'Starts a TicTacToe Game!',
    aliases: ['ttt'],
    usage: '<User>',
    run : async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}