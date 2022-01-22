Twitch Chat Bot

The purpose of this chat bot is to respond with predefined messages. A sample file exists called commands.yaml.template

## Setup


### **Environment File**

Copy the **.env.sample** to the root of the project and rename it to **.env**

Details about the variables that need updating:

- **BOT_USERNAME**

    The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate.

-   **CHANNEL_NAME**

    The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.

- **OAUTH_TOKEN**

    The token to authenticate your chatbot with Twitch's servers. Generate this with https://twitchapps.com/tmi/ (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string.

### **Bot Auto Replay File**
Copy the **autoreply.json.example** file to the root of the project and rename it to **autoreply.json** and make any modifications.

This file also allows you to have a reply message fire off every number of seconds if the **timer** section is added to a command.

    - *timer.enabled*  = the timer is on
    - *timer.onStart* = fires as soon as the client is connected
    - *timer.seconds* = auto post this message in chat every x seconds

- The chat bot must be restarted to reflect any changes in this file

<hr>

## Example Bot Configs

Chat Bot that responds to user commands and a timer:
- User enters **!info** in chat
- As soon as the client is connected (**node bot.js**)
- Every 500 seconds (5 minutes)
```
{
    "command":"!info",
    "enabled": true,
    "message": "working on chatbot api testing",
    "timer":{
      "enabled": true,
      "onStart": true,
      "seconds": 500
    }
```

Chat bot that only uses a timer:
- Does not respond to the **!info** command
- As soon as the client is connected (**node bot.js**)
- Every 500 seconds (5 minutes)
```
{
    "command":"!info",
    "enabled": false,
    "message": "working on chatbot api testing",
    "timer":{
      "enabled": true,
      "onStart": true,
      "seconds": 500
    }
```
Chat bot command that only runs on start:
- Does not respond to the **!info** command
- As soon as the client is connected (**node bot.js**)
- 0 seconds turns off the timer
```
{
    "command":"!info",
    "enabled": false,
    "message": "working on chatbot api testing",
    "timer":{
      "enabled": true,
      "onStart": true,
      "seconds": 0
    }
```

<hr>

## Install dependencies

```
npm install
```

Run the application

```
node bot.js
```

Now navigate to you the channel you specified for the **CHANNEL_NAME** variable and enter one of the commands from the command.yaml file.

NOTE: The command in the chat must start with an exclamation (!).

If the command is valid then the bot will respond with the value specified in the command.yaml file