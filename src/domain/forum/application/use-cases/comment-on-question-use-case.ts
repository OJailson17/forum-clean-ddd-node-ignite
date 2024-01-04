import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository';
import { QuestionsRepository } from '../repositories/questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CommentOnQuestionRequest {
	authorId: string;
	questionId: string;
	content: string;
}

interface CommentOnQuestionResponse {
	questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute({
		questionId,
		content,
		authorId,
	}: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error('Question not found.');
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityID(authorId),
			questionId: new UniqueEntityID(questionId),
			content,
		});

		await this.questionCommentsRepository.create(questionComment);

		return {
			questionComment,
		};
	}
}
