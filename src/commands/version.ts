import { cyan } from "kleur";
import { VERSIONS } from "../constants";
import { openAP } from "../util/ap";
import { ask } from "../util/prompt/ask";
import { choices } from "../util/prompt/choices";
import { rerunVersion } from "../util/rerun";
import { __ap } from "../util/__ap";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";
import open from "./subcommands/open";
import os, { Os } from "./subcommands/os";

const action = async () => {
    const answer = await question()
    const extensions = await extension.question();
    const knimeini = await knimeIni.question();

    const url = createVersionURL(answer.os, answer.version)

    const absolutePath = await __ap(url, extensions, knimeini)

    const shouldOpen = await open.question();

    console.log(cyan("Rerun this command:"));
    console.log(rerunVersion(answer, extensions, knimeini, shouldOpen));

    if (shouldOpen) openAP(absolutePath);
}

const question = async () => {
    const version = await ask<string>({
        type: "select",
        name: "c1",
        message: "Select a Version:",
        choices: choices(VERSIONS),
    });

    return { os: await os.question("c2"), version };
};

const createVersionURL = (os: Os, version: string): string => {
    switch (os) {
        case "linux":
            return `https://download.knime.org/analytics-platform/linux/knime_${version}.linux.gtk.x86_64.tar.gz`
        case "macosx":
            return `https://download.knime.org/analytics-platform/macosx/knime_${version}.app.macosx.cocoa.x86_64.dmg`
        case "win":
            return `https://download.knime.org/analytics-platform/win/knime_${version}.win32.win32.x86_64.zip`
        default:
            throw new Error("Something went wrong.");

    }
}

export default { action };
