import { Command } from "discord-akairo"
import { Message, MessageEmbed } from "discord.js"
import fetch from "node-fetch"

export default class WinkCommand extends Command {
    public constructor() {
        super('meme', {
            aliases: ['meme'],
            category: 'Fun',
            description: {
                content: 'sends a meme',
            }
        })
    }

    public async exec(message: Message) {
        fetch("https://meme-api.herokuapp.com/gimme")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(body.title)
                    .setURL(body.postLink)
                    .setImage(body.url)
                    .setFooter(`From r/${body.subreddit}`)
                message.channel.send(embed)
            })
    }
}