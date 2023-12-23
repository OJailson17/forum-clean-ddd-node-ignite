import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question by Slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to get a question by slug', async () => {
		const questionCreated = Question.create({
			content: 'New question',
			title: 'test title',
			slug: Slug.create('test-title'),
			authorId: new UniqueEntityID('1'),
		});

		await inMemoryQuestionsRepository.create(questionCreated);

		const { question } = await sut.execute({
			slug: 'test-title',
		});

		expect(question.id).toBeTruthy();
		expect(question.title).toEqual(questionCreated.title);
	});
});
