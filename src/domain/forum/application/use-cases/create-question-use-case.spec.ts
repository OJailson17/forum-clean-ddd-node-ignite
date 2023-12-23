import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { CreateQuestionUseCase } from './create-question-use-case';

const fakeQuestionsRepository: QuestionsRepository = {
	create: async (question: Question) => {
		return;
	},
};

describe('Create question', () => {
	it('should be able to create a question', async () => {
		const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

		const { question } = await createQuestion.execute({
			content: 'New question',
			title: 'test title',
			authorId: '1',
		});

		expect(question.id).toBeTruthy();
		expect(question.content).toEqual('New question');
	});
});
