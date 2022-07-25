import { OPEN_ID } from "../../constants";
import { ask } from "../../util/prompt/ask";

const question = async (): Promise<boolean> => {
    return ask<boolean>({
        type: "confirm",
        name: OPEN_ID,
        message: "Open AP?:",
    });
};

export default { question };
