import { Command } from "discord-akairo"
import { Message, MessageEmbed, GuildMember } from "discord.js"
import fetch from "node-fetch"


export default class RedditCommand extends Command {
    public constructor() {
        super('reddit', {
            aliases: ['reddit'],
            category: 'Fun',
            description: {
                content: 'sends an image from a specified subreddit',
                usage: 'dankmemes',
                examples: [
                    'me_irl',
                    'dankmemes'
                ]
            },
            args: [
                {
                    id: 'subreddit',
                    prompt: {
                        start: (msg: Message) => `${msg.author} please specify a valid subreddit`,
                        retry: (msg: Message) => `${msg.author} thats not a valid subreddit`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { subreddit } : { subreddit: string }) {
        fetch(`https://reddit-api--raghavken.repl.co/reddit/${subreddit}`)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            if(!body.img) return message.channel.send(body.error) 

            else {
            let embed = new MessageEmbed()
            .setTitle(`From r/${subreddit}`)
            .setImage(body.img)
            .setColor("#9cc4e4")
            message.channel.send(embed)

            }
        })
    }
}