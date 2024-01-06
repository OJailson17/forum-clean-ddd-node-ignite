import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer-use-case';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});

	it('should be able to edit an answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityID('author-1'),
			},
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-1',
			content: 'content answer',
		});

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'content answer',
		});
	});

	it('should not be able to edit an answer from another user', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityID('author-1'),
			},
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-2',
			content: 'new content answer',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
