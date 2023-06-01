import {Model, model, property} from '@loopback/repository';
import {randomUUID, UUID} from 'crypto';

@model({settings: {strict: false}})
export class StageEntryRecord extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: UUID = randomUUID();

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  stageTypeId: string;

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
    type: 'number',
  })
  count: number;

  @property({
    type: 'number',
  })
  priceForTheDay: number;

  @property({
    type: 'number',
  })
  totalPrice: number;

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
