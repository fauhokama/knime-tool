import { VERSIONS } from "../constants";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { osQuestion } from "../util/osQuestion";

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

export default { question };
