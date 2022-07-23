import { cyan } from "kleur/colors";
import { DOWNLOAD_FOLDER } from "../constants";
import { getAbsolutePath } from "./ap";
import decompress from "./common/decompress";
import download from "./common/download";

export const downloadAndDecompress = async (url: string) => {
    console.log(`${cyan(`Downloading from URL:`)} ${url}`);
    const filename = await download(url, DOWNLOAD_FOLDER);
    const source = getAbsolutePath(filename as string);
    console.log(`${cyan(`Decompressing...`)}`);
    return decompress(source, DOWNLOAD_FOLDER, true);
}