import { Command } from "discord-akairo"
import { Message, MessageEmbed } from "discord.js"
import * as _ from "weather-js"

export default class WeatherCommand extends Command {
  public constructor() {
    super('weather', {
        aliases: ['weather'],
        category: 'Utility',
        description: {
          content: 'Check the weather'
      },
        args: [
          {
              id: 'location',
              type: 'string',
              prompt: {
                start: (msg: Message) => `${msg.author} please provide a location`,
                retry: (msg: Message) => `${msg.author} thats not a valid location`
              }
          }
        ]
    })
  }
  public async exec(message: Message, { location } : { location : string}) {
      _.find({search: location, degreeType: "F"}, function (err, result) {
        message.util.send(
          new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(result[0].location.name)
          .addField("Temperature", `${result[0].current.temperature} Farenheit`, true)
          .addField("Sky Text", result[0].current.skytext, true)
          .addField("Humidity", result[0].current.humidity, true)
          .addField("Wind Speed", result[0].current.windspeed, true)
          .addField("Current Time", result[0].current.observationtime, true)
          .addField("Feels Like", `${result[0].current.feelslike} Fahrenheit`, true)
          .setThumbnail(result[0].current.imageUrl)
        )
      })
  }
}