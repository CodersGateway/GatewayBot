import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import ms from "parse-ms";
import db from "quick.db";

export default class WorkCommand extends Command {
    public constructor() {
        super("work", {
            aliases: ['work'],
            category: 'Economy',
            description: {
                content: 'work for money'
            }
        })
    }
    public exec(message: Message) {
        let timeout = 3600000 
    
        let worked = db.fetch(`worked_${message.author.id}`);

        if (worked != null && timeout - (Date.now() - worked) > 0) {
            let time = ms(timeout - (Date.now() - worked));
            let embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Hey ${message.author.username} slow down there`)
            .setDescription(`You can work again in ${time.hours}h ${time.minutes}m ${time.seconds}s`)
           message.channel.send(embed)


        } else {
            let amountearned = Math.floor(Math.random() * 500) + 1

            let jobs = ["Developer", "Scientist", "Doctor", "Shopkeeper", "Streamer", "Politician"]
            let job = jobs[Math.floor(Math.random()* jobs.length)]

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`${message.author}, you worked as a ${job} and earnt **$${amountearned}** it was placed in your wallet`)

            message.channel.send(embed)

            db.add(`money_${message.author.id}`, amountearned)
            //@ts-ignore
            db.set(`worked_${message.author.id}`, Date.now())
        }
    }
}