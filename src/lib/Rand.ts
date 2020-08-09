import { randomBytes } from "crypto";
import { promisify as _p } from "util";

/**
 * Get a more secure random number between 0 and 1 synchronously.
 */
export function srandSync(): number {
    return parseInt(randomBytes(8).toString("hex"), 16) / 18446744073709552000;
}

/**
 * Get a more secure random number between 0 and 1 asynchronously.
 */
export async function srand(): Promise<number> {
    return parseInt((await _p(randomBytes)(8)).toString("hex"), 16) / 18446744073709552000;
}

/**
 * Get a random value between a minimum and maximum value (inclusive).
 * @param max Maximum value. Default: 1
 * @param min Minimum value. Default: 0
 */
export function srandInRangeSync(max: number = 1, min: number = 0): number {
    return (srandSync() * (max - min) + min);
}

/**
 * Get a random value between a minimum and maximum value (inclusive).
 * @param max Maximum value. Default: 1
 * @param min Minimum value. Default: 0
 */
export async function srandInRange(max: number = 1, min: number = 0): Promise<number> {
    return ((await srand()) * (max - min) + min);
}
