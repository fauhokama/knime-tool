import { prompt, PromptObject } from "prompts";

export const ask = async <T>(question: PromptObject): Promise<T> => {
	const response = await prompt(question);
	return response[question.name as string];
};
