import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment-use-case';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});

	it('should be able to delete a comment from a answer', async () => {
		const answerComment = makeAnswerComment();

		await inMemoryAnswerCommentsRepository.create(answerComment);

		await sut.execute({
			answerCommentId: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		});

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete another user comment from a answer', async () => {
		const answerComment = makeAnswerComment({
			authorId: new UniqueEntityID('author-1'),
		});

		await inMemoryAnswerCommentsRepository.create(answerComment);

		await expect(() =>
			sut.execute({
				answerCommentId: answerComment.id.toString(),
				authorId: 'author-2',
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
