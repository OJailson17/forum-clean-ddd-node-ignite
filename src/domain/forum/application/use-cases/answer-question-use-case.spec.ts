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
		const { answer } = await sut.execute({
			content: 'New answer',
			instructorId: '1',
			questionId: '1',
		});

		expect(answer.content).toEqual('New answer');
		expect(answer.id).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
	});
});
