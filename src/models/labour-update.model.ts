import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class LabourUpdateModel extends Model {
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
  price: string;

  @property({
    type: 'string',
    default: new Date(),
  })
  date: string;

  @property({
    type: 'string',
  })
  labourCount: number;

  @property({
    type: 'string',
  })
  id: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isPriceEditable: boolean;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LabourUpdateModel>) {
    super(data);
  }
}

export interface LabourUpdateModelRelations {
  // describe navigational properties here
}

export type LabourUpdateModelWithRelations = LabourUpdateModel & LabourUpdateModelRelations;
