import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { User, Message, Collection } from "discord.js";
import { join } from "path";
import { prefix, owners, token } from "../Config"


declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        snipes: Collection<string, any>;
    }
}

interface BotOptions {
    token?: string;
    owners?: string[];

    
}


  

export default class BotClient extends AkairoClient {

    public snipes = new Collection<string, any>();

    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });


    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 0,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string =>`${str}\n\nType \`cancel\` to cancel the command...`,
                modifyRetry: (_: Message, str: string): string =>`${str}\n\nType \`cancel\` to cancel the command...`,
                timeout: "You took too long, the command has been cancelled.",
                ended: "You exceeded the maximum amount of tries, the command has been cancelled.",
                cancel: "This command has been cancelled.",
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: owners
    });

    public constructor(config: BotOptions) {
        super({
            ownerID: config.owners
        });

        this.config = config;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            websocket: this.ws,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
}
    
}