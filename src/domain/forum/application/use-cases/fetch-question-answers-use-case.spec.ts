import { FetchQuestionsAnswersUseCase } from './fetch-questions-answers-use-case';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

describe('Fetch Answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
	});

	it('should be able to fetch questions answers', async () => {
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityID('question-1') }),
		);
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityID('question-1') }),
		);
		await inMemoryAnswersRepository.create(
			makeAnswer({ questionId: new UniqueEntityID('question-1') }),
		);

		const { answers } = await sut.execute({
			page: 1,
			questionId: 'question-1',
		});

		expect(answers).toHaveLength(3);
	});
	it('should be able to fetch paginated questions answers', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryAnswersRepository.create(
				makeAnswer({ questionId: new UniqueEntityID('question-2') }),
			);
		}

		const { answers } = await sut.execute({
			page: 2,
			questionId: 'question-2',
		});

		expect(answers).toHaveLength(2);
	});
});
