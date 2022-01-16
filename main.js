const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["message", "CHANNEL", "REACTION"]});

const prefix = '=';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles =fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('ready');



    client.on('guildMemberAdd', guildMember =>{
        let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');

        guildMember.roles.add(welcomeRole);
        guildMember.guild.channels.cache.get('927173569547501608').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check #Regulamin`)
    });


});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    
    }else if (command === 'pong'){
        client.commands.get('pong').execute(message, args);
    
    }else if (command === 'youtube'){
        message.channel.send('https://www.youtube.com/channel/UCZBnpWJ1zHfoRUYAq_gYLzg');
    
    }else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    
    }else if (command === 'reddit'){
        client.commands.get('reddit').execute(message, args);
    
    }else if(command === 'ban'){
        client.commands.get('ban').execute(message, args);
    
    }else if(command === 'kick'){
        client.commands.get('kick').execute(message, args);
    
    }else if(command === 'mute'){
        client.commands.get('mute').execute(message, args);
    
    }else if(command === 'unmute'){
        client.commands.get('unmute').execute(message, args);
    
    }else if(command === 'reactionrole'){
    client.commands.get('reactionrole').execute(message, args, Discord, client);
    }

});




client.login('TOKEN');
