import { bold, green } from "kleur";
import extension from "../commands/subcommands/extension";
import knimeIni from "../commands/subcommands/knimeIni";
import { REPOSITORIES } from "../constants";
import { getAbsolutePath } from "./ap";
import { downloadAndDecompress } from "./downloadAndDecompress";

// Downloads, Decompress and install extensions & knimeIni.
// Returns absolutePath to AP dir.
export const installAp = async (url: string, extensions: string[], knimeini: string[]): Promise<string> => {
    const filename = await downloadAndDecompress(url)
    const absolutePath = getAbsolutePath(filename);
    await extension.action(absolutePath, REPOSITORIES, extensions);
    await knimeIni.action(absolutePath, knimeini);
    console.log(green(`Open AP by running the ${bold("list")} command`));

    return absolutePath;
}