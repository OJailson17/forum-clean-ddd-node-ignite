import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CreateQuestionRequest {
	authorId: string;
	title: string;
	content: string;
}

interface CreateQuestionResponse {
	question: Question;
}

export class CreateQuestion {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		title,
		content,
		authorId,
	}: CreateQuestionRequest): Promise<CreateQuestionResponse> {
		const question = Question.create({
			title,
			content,
			authorId: new UniqueEntityID(authorId),
		});

		await this.questionsRepository.create(question);

		return {
			question,
		};
	}
}
