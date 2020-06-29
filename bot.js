// Run dotenv
require('dotenv').config();

// Import libraries
const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require("./config.json");

// Event listener when a user connected to the server.
client.on('ready', () => {
    console.log(`I'm ready!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', msg => {

    // Only messages with the prefix and from humans.
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    // We check the message content and looks for the word "ping", so we can have the bot respond "pong"
    if (msg.content === '+exchange') {
        msg.channel.send('Upvote to participte in movie exchange.')
            .then(sentMessage => {

                sentMessage.react('👍');

                // Listen for upvotes to the current message
                const filter = (reaction, user) => {
                    console.log(`${user.id}===${sentMessage.author.id}`);
                    return reaction.emoji.name === '👍';// && user.id === sentMessage.author.id;
                };

                sentMessage.awaitReactions(filter, { max: 4, time: 4000, errors: ['time'] })
                    .then(collected => {
                        console.log("Echo");
                    })
                    .catch(collected => {
                        let reactions = collected.first().count;
                        console.log(`${reactions} are up for exchange!.`);
                        msg.channel.send(`${reactions} persons are up for exchange!.`);
                    });

            });
    }

});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);