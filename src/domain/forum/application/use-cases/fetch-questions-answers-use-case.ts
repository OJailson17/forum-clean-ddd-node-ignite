import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionsAnswersRequest {
	page: number;
	questionId: string;
}

interface FetchQuestionsAnswersResponse {
	answers: Answer[];
}

export class FetchQuestionsAnswersUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionsAnswersRequest): Promise<FetchQuestionsAnswersResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId,
			{ page },
		);

		return {
			answers,
		};
	}
}
