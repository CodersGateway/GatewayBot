import { updateInterval } from "./Config";
import { exec } from "child_process";

interface IExecResult {
    stdout: string;
    stderr: string;
}

async function execAsync(command: string): Promise<IExecResult> {
    return await new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err != null) reject(err);
            else resolve({
                stderr,
                stdout,
            });
        });
    });
}

export let CheckInterval: number = updateInterval;
export let LastCheck: number = Date.now();
export let UpdateStop: boolean = false;

export async function UpdateLoop(): Promise<void> {
    setInterval(async () => {
        // DO STUFF
        try {
            console.log("Checking for updates...");
            const res = await execAsync("git fetch");
            if (res.stderr.length > 0) { // Wut. Stderr contains the stdout I guess?!
                // New version
                console.log("A new commit is available to pull.");
                await execAsync("git pull");
                UpdateStop = true;
                process.exit(0);
            }
        } catch (e) {
            throw e;
        }
        // Set last check to now.
        LastCheck = Date.now();
    }, CheckInterval);
}