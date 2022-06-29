import { Choice, prompt, PromptObject } from "prompts";

export const ask = async <T>(question: PromptObject): Promise<T> => {
	const response = await prompt(question);
	const r = response[question.name as string];

	// No validation for Extensions or KnimeIni.
	if (question.name === "e" || question.name === "k") return r;

	validateAnswer(question.choices as Choice[], r);
	return r;
};

const validateAnswer = async (validAnswers: Choice[], answer: string) => {
	const va = validAnswers.map((answer) => answer.value);
	if (!va.includes(answer)) throw new Error(`Invalid argument: ${answer}. Valid arguments are: ${va.join(", ")}`).message;
};