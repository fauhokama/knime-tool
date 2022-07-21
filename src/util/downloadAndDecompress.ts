import { cyan } from "kleur/colors";
import { DOWNLOAD_FOLDER } from "../constants";
import { getAbsolutePath } from "./ap";
import decompress from "./decompress";
import download from "./download";

export const downloadAndDecompress = async (url: string) => {
    console.log(`${cyan(`Downloading from URL:`)} ${url}`);
    const filename = await download(url, DOWNLOAD_FOLDER);
    const source = getAbsolutePath(filename as string);
    console.log(`${cyan(`Decompressing...`)}`);
    return decompress(source, DOWNLOAD_FOLDER, true);
}