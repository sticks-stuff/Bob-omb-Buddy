const Discord = require('discord.js');
const client = new Discord.Client();
const regex = /\[\[(.*?)\]\]/g;
require('dotenv').config();

const wiki = require('wikijs').default;


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.author.bot != true) {
        var found = msg.content.match(regex);
        if (found != null) {
            for(i = 0; i < found.length; i++) {
                result = found[i].slice(2,-2);
                
                wiki({ apiUrl: 'https://ukikipedia.net/mediawiki/api.php' }).find(result).then(page => {
                    msg.channel.send(page.raw.fullurl);
                  }, reason => {
                    msg.channel.send(":octagonal_sign: **No article matching \"" + result + "\"**");
                  });
            }
        }
    }
});

client.login(process.env.discordToken);