import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MaterialUpdateModel extends Model {
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
  })
  id: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MaterialUpdateModel>) {
    super(data);
  }
}

export interface MaterialUpdateModelRelations {
  // describe navigational properties here
}

export type MaterialUpdateModelWithRelations = MaterialUpdateModel & MaterialUpdateModelRelations;
