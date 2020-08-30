import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export default class JokeCommand extends Command {
  public constructor() {
    super('joke', {
      aliases: ['joke'],
      category: 'Fun',
      description: 'get a random joke',
      ratelimit: 1,
      cooldown: 1000
    })
  }
  public async exec(message: Message) {
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.json())
      .then((body) => {
      message.util.send(
        new MessageEmbed()
          .setTitle(`Joke for ${message.author.username}`)
          .setDescription(`${body.setup}\n${body.punchline}`)
        .setColor("RANDOM")
        )
    })
  }
}