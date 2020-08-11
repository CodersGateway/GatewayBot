import ms from "parse-ms";
import { Message, MessageEmbed} from "discord.js";
import { Command } from "discord-akairo";
import db from "quick.db"

export default class DailyCommand extends Command {
    public constructor() {
        super("daily", {
            aliases: ['daily'],
            category: 'Economy',
            description: {
                content: 'get your daily coins'
            }
        });
    }

    public async exec(message) {
        let timeout = 86400000
        let amount = 1500

        let daily = db.fetch(`daily_${message.author.id}`);

        if (daily != null && timeout - (Date.now() - daily) > 0) {
            //@ts-ignore
            let time = ms(timeout - (Date.now() - daily));
            let embed = new MessageEmbed()
                .setColor("#9cc4e4")
                .setTitle(`Hey ${message.author.username} slow down there`)
                .setDescription(`You can redeem your daily reward in ${time.hours}h ${time.minutes}m ${time.seconds}s`)
            message.channel.send(embed)


        } else {
            let embed = new MessageEmbed()
                .setAuthor(`Daily`, message.author.displayAvatarURL({dynamic: true}))
                .setColor("#9cc4e4")
                .setTitle(`Here is your daily money ${message.author.username}`)
                .setDescription(`**$${amount}** was placed in your wallet`)
            message.channel.send(embed)

            //@ts-ignore
            db.add(`money_${message.author.id}`, amount)
            //@ts-ignore
            db.set(`daily_${message.author.id}`, Date.now())
        }
    }
}