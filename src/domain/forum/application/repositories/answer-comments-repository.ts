import { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
	create(questionComment: AnswerComment): Promise<void>;
	delete(questionComment: AnswerComment): Promise<void>;
	findById(id: string): Promise<AnswerComment | null>;
}
