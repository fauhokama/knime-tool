import { green, bold } from "kleur";
import extension from "../commands/subcommands/extension";
import knimeIni from "../commands/subcommands/knimeIni";
import open from "../commands/subcommands/open";
import { REPOSITORIES } from "../constants";
import { getAbsolutePath, openAP } from "./ap";
import { downloadAndDecompress } from "./downloadAndDecompress";

// Downloads, Decompress and install extensions & knimeIni.
export const __ap = async (url: string, extensions: string[], knimeini: string[]) => {
    const filename = await downloadAndDecompress(url)
    const absolutePath = getAbsolutePath(filename);
    await extension.action(absolutePath, REPOSITORIES, extensions);
    await knimeIni.action(absolutePath, knimeini);
    console.log(green(`Open AP by running the ${bold("list")} command`));

    const answer = await open.question();

    if (answer) openAP(absolutePath);

    return answer;
}