
import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import fetch from "node-fetch";

export default class AwooifyCommand extends Command {
  public constructor() {
    super('awooify', {
      aliases: ['awooify'],
      category: 'Image Manipulation',
      description: 'awooify someone or yourself :eyes:',
      args: [
        {
          id: 'person',
          type: 'member',
          default: (msg: Message) => msg.member
        }
      ]
    })
  }
  public async exec(message: Message, { person }: { person }) {
    const msg = await message.channel.send("Generating...(this may take a while)")
    fetch(`https://nekobot.xyz/api/imagegen?type=awooify&url=${person.user.displayAvatarURL({dynamic: true, size: 1024})}`)
    .then((res) => res.json())
    .then((body) => {
        let embed = new MessageEmbed()
        .setTitle(`${person.user.username} got awooified`)
        .setImage(body.message)
        .setColor("RANDOM")
      msg.delete()
      message.util.send(embed)
    })
  }
}