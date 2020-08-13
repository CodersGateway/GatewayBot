import { Command } from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch"

export default class Dog extends Command {
  public constructor() {
    super('dog', {
        aliases: ['dog'],
        description: {
          content: 'see a pic of a dog'
        },
        category: 'Images'
      })
  }
  public async exec(message: Message) {
    const msg = await message.util.send("Fetching a dog picture...")
    fetch("https://some-random-api.ml/img/dog")
    .then((res) => res.json())
    .then((body) => {
        let embed = new MessageEmbed()
        .setTitle(`Dog for ${message.author.username}`)
        .setImage(body.link)
        .setTimestamp(Date.now())
        .setColor("RANDOM")
        msg.edit(embed)
    })
  }
}