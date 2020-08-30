
import { Command } from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch"
import { MessageFlags } from "discord.js";

export default class KoalaCommand extends Command {
  public constructor() {
    super('koala', {
        aliases: ['koala'],
        description: {
          content: 'see a pic of a koala'
        },
        category: 'Images'
      })
  }
  public async exec(message: Message) {
    const msg = await message.channel.send("Fetching a koala picture...")
    fetch("https://some-random-api.ml/img/koala")
    .then((res) => res.json())
    .then((body) => {
        let embed = new MessageEmbed()
        .setTitle(`Koala for ${message.author.username}`)
        .setImage(body.link)
        .setTimestamp(Date.now())
        .setColor("RANDOM")
        msg.delete()
        message.util.send(embed)
    })
  }
}