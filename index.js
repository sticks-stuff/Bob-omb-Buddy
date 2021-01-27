const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var regex = /\[(.*?)\]/g;
  var found = msg.content.match(regex);
  if (found != null) {
    msg.reply('pong');
  }
});

client.login('ODAzOTE2MTc3MTI5OTk2Mjg4.YBEvSA.GfYPD1KOGl1yAt_XsT3WuLw8ImU');