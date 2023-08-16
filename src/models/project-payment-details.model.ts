import {Model, model, property} from '@loopback/repository';
import {randomUUID, UUID} from 'crypto';

@model({settings: {strict: false}})
export class ProjectPaymentDetailsModel extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: UUID = randomUUID();

  @property({
    type: 'string',
  })
  paymentType: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  insertedDate?: string;

  @property({
    type: 'string',
  })
  dateOfPayment?: string;

  @property({
    type: 'number',
  })
  payment: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProjectPaymentDetailsModel>) {
    super(data);
  }
}

export interface ProjectPaymentDetailsRelations {
  // describe navigational properties here
}

export type ProjectPaymentDetailsWithRelations = ProjectPaymentDetailsModel & ProjectPaymentDetailsRelations;
