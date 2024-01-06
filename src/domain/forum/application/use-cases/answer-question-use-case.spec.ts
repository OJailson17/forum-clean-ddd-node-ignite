import { AnswerQuestionUseCase } from './answer-question-use-case';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it('should be able to create an answer', async () => {
		const result = await sut.execute({
			content: 'New answer',
			instructorId: '1',
			questionId: '1',
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
	});
});
