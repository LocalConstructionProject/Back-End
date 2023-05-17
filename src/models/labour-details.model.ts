import {Model, model, property} from '@loopback/repository';
import {LabourUpdateModel} from './labour-update.model';

@model({settings: {strict: false}})
export class LabourModel extends Model {

  @property({
    type: 'array',
    itemType: 'object'
  })
  labours?: [LabourUpdateModel];
  
  constructor(data?: Partial<LabourModel>) {
    super(data);
  }
}

export interface LabourModelRelations {
  // describe navigational properties here
}

export type LabourModelWithRelations = LabourModel & LabourModelRelations;
