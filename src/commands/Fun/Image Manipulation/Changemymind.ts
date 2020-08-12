import { Command} from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch";

export default class ChangemymindCommand extends Command {
    public constructor() {
        super('changemymind', {
            aliases: ['changemymind', 'cmm'],
            category: 'Image Manipulation',
            description: {
                content: 'make your own change my mind meme'
            },
            args: [
                {
                    id: 'text',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide text`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { text } : { text: string}) {
        if(text.length > 80) return message.util.send("please retry the command with a lower character count")
        const msg = await message.util.send("Generating your meme...(this may take a while)")
        fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                    .setTitle(`Here ya go ${message.author.username}`)
                    .setImage(body.message)
                    .setColor("RANDOM")
                msg.edit(embed)
            })
    }
}