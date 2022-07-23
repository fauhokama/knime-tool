import { cyan } from "kleur";
import { VERSIONS } from "../constants";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { osQuestion } from "../util/osQuestion";
import { rerunVersion } from "../util/rerun";
import { __ap } from "../util/__ap";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";

const action = async () => {
    const answer = await question()
    const extensions = await extension.question();
    const knimeini = await knimeIni.question();

    let url;
    switch (answer.os) {
        case "linux":
            url = `https://download.knime.org/analytics-platform/linux/knime_${answer.version}.linux.gtk.x86_64.tar.gz`
            break;
        case "macosx":
            url = `https://download.knime.org/analytics-platform/macosx/knime_${answer.version}.app.macosx.cocoa.x86_64.dmg`
            break;
        case "win":
            url = `https://download.knime.org/analytics-platform/win/knime_${answer.version}.win32.win32.x86_64.zip`
            break;
    }

    const open = await __ap(url, extensions, knimeini)

    console.log(cyan("Rerun this command:"));
    console.log(rerunVersion(answer, extensions, knimeini, open));
}

const question = async () => {
    const version = await ask<string>({
        type: "select",
        name: "c1",
        message: "Select a Version:",
        choices: choices(VERSIONS),
    });

    const os = await osQuestion("c2");

    return { version, os };
};

export default { action };
