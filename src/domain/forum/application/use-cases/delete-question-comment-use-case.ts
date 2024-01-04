import { QuestionsCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteCommentOnQuestionRequest {
	authorId: string;
	questionCommentId: string;
}

interface DeleteCommentOnQuestionResponse {}

export class DeleteCommentOnQuestionUseCase {
	constructor(
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute({
		questionCommentId,
		authorId,
	}: DeleteCommentOnQuestionRequest): Promise<DeleteCommentOnQuestionResponse> {
		const questionComment = await this.questionCommentsRepository.findById(
			questionCommentId,
		);

		if (!questionComment) {
			throw new Error('Question comment not found.');
		}

		if (questionComment.authorId.toString() !== authorId) {
			throw new Error('Not allowed');
		}

		await this.questionCommentsRepository.delete(questionComment);

		return {};
	}
}
