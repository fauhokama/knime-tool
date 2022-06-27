import { Choice } from "prompts";

export const choices = <T>(arr: T[]): Choice[] => {
	return arr.map((choice) => Object.create({ title: choice, value: choice }));
};
