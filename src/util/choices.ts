import { Choice } from "prompts";

export const choices = (arr: string[]): Choice[] => {
	return arr.map((choice) => Object.create({ title: choice, value: choice }));
};
