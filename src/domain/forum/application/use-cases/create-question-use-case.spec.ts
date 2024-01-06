import { CreateQuestionUseCase } from './create-question-use-case';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to create a question', async () => {
		const result = await sut.execute({
			content: 'New question',
			title: 'test title',
			authorId: '1',
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.items[0]).toEqual(
			result.value?.question,
		);
	});
});
