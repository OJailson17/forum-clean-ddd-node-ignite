import { Either, left, right } from '@/core/either';
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteQuestionCommentRequest {
	authorId: string;
	questionCommentId: string;
}

type DeleteQuestionCommentResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteQuestionCommentUseCase {
	constructor(
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute({
		questionCommentId,
		authorId,
	}: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
		const questionComment = await this.questionCommentsRepository.findById(
			questionCommentId,
		);

		if (!questionComment) {
			return left(new ResourceNotFoundError());
		}

		if (questionComment.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.questionCommentsRepository.delete(questionComment);

		return right({});
	}
}
