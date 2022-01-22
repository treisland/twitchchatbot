const tmi = require('tmi.js');
const dotenv = require('dotenv');
const yaml = require('js-yaml')
const fs = require('fs');

dotenv.config()

// Define configuration options
const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel,tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    console.log(msg);
    const commandName = msg.trim();

    try {
        let fileContents = fs.readFileSync('./botcommands.yaml', 'utf8');
        let data = yaml.load(fileContents);

        if (data[commandName]) {
            //client.say(target, data[commandName]);
            client.say(channel, `@${tags.username}, ${data[commandName]}`);
        }
    } catch (e) {
        console.log(e);
    }
}

// Function called when the "dice" command is issued
function rollDice() {
    const sides = 20;
    return Math.floor(Math.random() * sides) + 1;
}

function timedMessages(){
    client.say("hello world")
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}