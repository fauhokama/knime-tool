import { ask } from "../../util/prompt/ask";

const question = async () => {
    return ask<boolean>({
        type: "confirm",
        name: "o",
        message: "Open AP?:",
    });
};

export default { question };
