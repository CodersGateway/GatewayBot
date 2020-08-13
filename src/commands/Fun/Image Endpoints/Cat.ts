import { Command } from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch"

export default class Cat extends Command {
  public constructor() {
    super('cat', {
        aliases: ['cat'],
        description: {
          content: 'see a pic of a cat'
        },
        category: 'Images'
      })
  }
  public async exec(message: Message) {
    const msg = await message.util.send("Fetching a cat picture...")
    fetch("https://some-random-api.ml/img/cat")
    .then((res) => res.json())
    .then((body) => {
        let embed = new MessageEmbed()
        .setTitle(`Cat for ${message.author.username}`)
        .setImage(body.link)
        .setTimestamp(Date.now())
        .setColor("RANDOM")
        msg.edit(embed)
    })
  }
}