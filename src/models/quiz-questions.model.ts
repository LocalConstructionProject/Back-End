import {Model, model, property} from '@loopback/repository';
import {QuizData} from './quiz-data.model';

@model({settings: {strict: false}})
export class QuizQuestionsModel extends Model {

  @property({
    type: 'array',
    itemType: 'object'
  })
  quizData: [QuizData];

  @property({
    type: 'string',
  })
  bookName: string;

  @property({
    type: 'string',
  })
  title: string;

  constructor(data?: Partial<QuizQuestionsModel>) {
    super(data);
  }
}

export interface QuizQuestionsModelRelations {
  // describe navigational properties here
}

export type QuizQuestionsModelWithRelations = QuizQuestionsModel & QuizQuestionsModelRelations;
