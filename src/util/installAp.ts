import { bold, cyan, green } from "kleur";
import extension from "../commands/subcommands/extension";
import knimeIni from "../commands/subcommands/knimeIni";
import { DOWNLOAD_FOLDER, REPOSITORIES } from "../constants";
import { prefixDownloadFolder } from "./ap";
import decompress from "./common/decompress";
import download from "./common/download";

// Downloads, Decompress and install extensions & knimeIni.
// Returns absolutePath to AP dir.
export const installAp = async (url: string, extensions: string[], knimeini: string[]): Promise<string> => {
    const filename = await downloadAndDecompress(url)
    const absolutePath = prefixDownloadFolder(filename);
    await extension.action(absolutePath, REPOSITORIES, extensions);
    await knimeIni.action(absolutePath, knimeini);
    console.log(green(`Open AP by running the ${bold("list")} command`));

    return absolutePath;
}

const downloadAndDecompress = async (url: string) => {
    console.log(`${cyan(`Downloading from URL:`)} ${url}`);
    const filename = await download(url, DOWNLOAD_FOLDER);
    const source = prefixDownloadFolder(filename as string);
    console.log(`${cyan(`Decompressing...`)}`);
    return decompress(source, DOWNLOAD_FOLDER, true);
}