/* eslint-disable indent */
import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
	implements QuestionsCommentsRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}

	async findById(id: string) {
		const questionCommentt = this.items.find(item => item.id.toString() === id);

		if (!questionCommentt) return null;

		return questionCommentt;
	}

	async delete(questionComment: QuestionComment) {
		const itemIndex = this.items.findIndex(
			item => item.id === questionComment.id,
		);

		this.items.splice(itemIndex, 1);
	}
}
