import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class ScrollCommand extends Command {
    public constructor() {
      super('scroll', {
        aliases: ['scroll'],
        category: 'Image Manipulation',
        description: {
          content: 'scroll meme'
        },
        args: [
          {
            id: 'text',
            type: 'string',
            match: 'rest',
            prompt: {
              start: (msg: Message) => `${msg.author} provide text`
            }
          }
        ]
      })
    }
  public async exec(message: Message, { text }: { text: string }) {
    const msg = await message.util.send("Generating your meme...")
    let embed = new MessageEmbed()
    .setColor("#9cc4e4")
    .setImage(`https://api.alexflipnote.dev/scroll?text=${encodeURIComponent(text)}`)
    .setTitle(`Here ya go ${message.author.username}`)
    msg.edit(embed)
  }
}