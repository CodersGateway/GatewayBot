import { Command } from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch"

export default class FactsCommand extends Command {
    public constructor() {
        super('facts', {
            aliases: ['facts'],
            category: 'Image Manipulation',
            description: {
                content: 'facts meme',
                usage: '<text>'
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
        const msg = await message.util.send("Generating your meme...")
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(`https://api.alexflipnote.dev/facts?text=${encodeURIComponent(text)}`)
        .setTitle(`Here ya go ${message.author.username}`)
        msg.edit(embed)
    
    }
}