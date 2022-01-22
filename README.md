Twitch Chat Bot

The purpose of this chat bot is to respond with predefined messages. A sample file exists called commands.yaml.template

Sample files that are available in the **templates** directory
Copy these files to the root of the project and make any modifications.

Make any modifications to the keys and values.
Add .env for variables

Create a new file in the root of this project called .env

Add 3 values

    BOT_USERNAME
        The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate.

    CHANNEL_NAME
        The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.

    OAUTH_TOKEN
        The token to authenticate your chatbot with Twitch's servers. Generate this with https://twitchapps.com/tmi/ (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string.

Example

    BOT_USERNAME="<twitch account name>"
    OAUTH_TOKEN="oauth:<token>"
    CHANNEL_NAME="<twitch channel>"

Install dependencies

npm install
Run the application

node bot.js

Now navigate to you the channel you specified for the CHANNEL_NAME variable and enter one of the commands from the command.yaml file.

NOTE: The command in the chat must start with an exclamation (!).

If the command is valid then the bot will respond with the value specified in the command.yaml file