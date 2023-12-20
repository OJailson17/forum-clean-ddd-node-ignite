import { AnswerQuestionUseCase } from './answer-question-use-case';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

describe('Answer Question', () => {
	it('should be able to create an answer', async () => {
		const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

		const answer = await answerQuestion.execute({
			content: 'New answer',
			instructorId: '1',
			questionId: '1',
		});

		expect(answer.content).toEqual('New answer');
	});
});
