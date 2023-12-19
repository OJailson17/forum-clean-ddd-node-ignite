import { describe, expect, it } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question-use-case';

describe('Answer Question', () => {
	it('should be able to create an answer', () => {
		const answerQuestion = new AnswerQuestionUseCase();

		const answer = answerQuestion.execute({
			content: 'New answer',
			instructorId: '1',
			questionId: '1',
		});

		expect(answer.content).toEqual('New answer');
	});
});
