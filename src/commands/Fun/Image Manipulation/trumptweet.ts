import { Command } from "discord-akairo";
import { Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch"

export default class TrumptweetCommand extends Command {
    public constructor() {
        super('trumptweet', {
            aliases: ['trumptweet', 'tt'],
            category: "Image Manipulation",
            description: {
                content: 'make trump send a tweet'
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
        });
    }
    public async exec(message, { text } : { text: string}) {

            const msg = await message.util.send("Generating a tweet...(this may take a while)")
            fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`)
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