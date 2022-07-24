import { ask } from "../../util/prompt/ask";
import { choices } from "../../util/prompt/choices";

export type Os = "linux" | "macosx" | "win";

const question = async (name: string): Promise<Os> => {
    return ask<Os>({
        type: "select",
        name,
        message: "Select an OS:",
        choices: choices<Os>(["linux", "macosx", "win"]),
    });
}

export default { question }