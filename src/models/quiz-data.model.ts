import {Model, model, property} from '@loopback/repository';
import {ProjectStageDetails} from './project-stage-details';
import {randomUUID, UUID} from 'crypto';

@model({settings: {strict: false}})
export class QuizData extends Model {
  @property({
    type: 'string',
  })
  _id : UUID = randomUUID();

  @property({
    type: 'string',
  })
  question: string;

  @property({
    type: 'string',
  })
  option_1: string;

  @property({
    type: 'string',
  })
  option_2: string;

  @property({
    type: 'string',
  })
  option_3: string;

  @property({
    type: 'number',
  })
  option_4: string;

  @property({
    type: 'array',
    itemType: 'object',
    default: []
  })
  stages?: [ProjectStageDetails];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<QuizData>) {
    super(data);
  }
}

export interface QuizDataRelations {
  // describe navigational properties here
}

export type QuizDataWithRelations = QuizData & QuizDataRelations;
