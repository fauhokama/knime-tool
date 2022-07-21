import { VERSIONS } from "../constants";
import { Os } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { downloadAndDecompress } from "../util/downloadAndDecompress";
import { osQuestion } from "../util/osQuestion";

const question = async () => {
    const version = await ask<number>({
        type: "select",
        name: "c1",
        message: "Select a Version:",
        choices: choices(VERSIONS),
    });

    const os = await osQuestion("c2");

    return { version, os };
};

export const action = async (answer: { version: number, os: Os }) => {
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
    return downloadAndDecompress(url);
};

export default { question, action };
