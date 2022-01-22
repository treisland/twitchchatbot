const tmi = require('tmi.js');
const dotenv = require('dotenv');
const yaml = require('js-yaml')
const fs = require('fs');
const { time } = require('console');
const internal = require('stream');

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
const bot_file="./autoreply.json"

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel,tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    try {
        let fileContents = fs.readFileSync(bot_file, 'utf8');
        let data = JSON.parse(fileContents);

        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj.enabled && obj.command === commandName) {
                //client.say(target, data[commandName]);
                client.say(channel, `@${tags.username}, ${obj.message}`);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    timedMessages()
}

function timedMessages(){
    const channel = process.env.CHANNEL_NAME

    try {
        let fileContents = fs.readFileSync(bot_file, 'utf8');
        let data = JSON.parse(fileContents);


        //console.log(data[1])
        for(var i = 0; i < data.length; i++) {
            (function(i){
                var obj = data[i];
             
                var timer = "timer" in obj ? obj.timer : null

                if (!timer || !timer.enabled) { return }

                if(timer.onStart){
                    client.say(channel, obj.message)
                }

                var interval = timer.seconds * 1000

                if (interval <= 0){ return }

                setInterval(() => {
                    client.say(channel, obj.message);
                }, interval);
                
            })(i)
        }

    } catch (e) {
        console.log(e);
    }
}
