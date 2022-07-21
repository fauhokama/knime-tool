import { Os } from "./ap";
import { ask } from "./ask";
import { choices } from "./choices";

export const osQuestion = async (name: string) => {
    return ask<Os>({
        type: "select",
        name,
        message: "Select an OS:",
        choices: choices<Os>(["linux", "macosx", "win"]),
    });
}