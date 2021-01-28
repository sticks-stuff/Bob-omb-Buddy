const Discord = require('discord.js');
const client = new Discord.Client();
const regex = /\[\[(.*?)\]\]/g;
require('dotenv').config();

const wiki = require('wikijs').default;


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('for Ukikipedia article queries', {type: 'WATCHING'});
});

client.on('message', msg => {
    if(msg.author.bot != true) {
        var found = msg.content.match(regex);
        var fail = false;
        if (found != null) {
            if(found.length < 4) {
                for(i = 0; i < found.length; i++) {
                    var result = found[i].slice(2,-2);
                    result = result.split(":").pop(); //this is a bad way to not let people make requests for user pages
                    
                    wiki({ apiUrl: 'https://ukikipedia.net/mediawiki/api.php' }).find(result).then(page => {
                            msg.channel.send(page.raw.fullurl);
                        }, reason => {
                        if(fail === false) {
                            msg.channel.send(":octagonal_sign: **One or more of the articles you requested could not be located!**"); //todo: could we be more specific about which errors get caught in this way?
                            fail = true;
                        }
                    });
                }
            } else {
                msg.channel.send(":octagonal_sign: **Sorry! Five is the maximum number of requested articles**");
            }
        }
    }
});

client.login(process.env.discordToken);