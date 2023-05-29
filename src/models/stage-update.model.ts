import {Model, model, property} from '@loopback/repository';
import {MaterialUpdateModel} from './material-update.model';
import {LabourUpdateModel} from './labour-update.model';

@model({settings: {strict: false}})
export class StageUpdateModel extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  _id: string;

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
    type: 'date',
    default: new Date(),
  })
  createdDate?: string;

  @property({
    type: 'array',
    itemType: 'object'
  })
  labourDetails?: [LabourUpdateModel];

  @property({
    type: 'array',
    itemType: 'string'
  })
  labourIds?: [string];

  @property({
    type: 'array',
    itemType: 'string'
  })
  materialIds?: [string];

  @property({
    type: 'array',
    itemType: 'object'
  })
  materialDetails?: [MaterialUpdateModel];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StageUpdateModel>) {
    super(data);
  }
}

export interface StageUpdateModelRelations {
  // describe navigational properties here
}

export type StageUpdateModelWithRelations = StageUpdateModel & StageUpdateModelRelations;
