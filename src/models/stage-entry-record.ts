import {Model, model, property} from '@loopback/repository';
import {ObjectId} from 'mongodb';

@model({settings: {strict: false}})
export class StageEntryRecord extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: ObjectId;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  id: string;

  @property({
    type: 'string',
  })
  type: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  insertedDate?: string;

  @property({
    type: 'string',
  })
  dateOfExecution?: string;

  @property({
    type: 'string',
  })
  count: string;

  @property({
    type: 'string',
  })
  priceForTheDay: string;

  @property({
    type: 'string',
  })
  totalPrice: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StageEntryRecord>) {
    super(data);
  }
}

export interface StageEntryRecordRelations {
  // describe navigational properties here
}

export type StageEntryRecordWithRelations = StageEntryRecord & StageEntryRecordRelations;
