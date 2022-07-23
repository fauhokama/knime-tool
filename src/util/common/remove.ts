import { rmSync } from "fs";

export const remove = (dir: string) => {
    rmSync(dir, { recursive: true, force: true });
};