import {Model, model, property} from '@loopback/repository';
import {StageUpdateModel} from './stage-update.model';

@model({settings: {strict: false}})
export class StageModel extends Model {

  @property({
    type: 'array',
    itemType: 'object'
  })
  stages?: [StageUpdateModel];
  
  constructor(data?: Partial<StageModel>) {
    super(data);
  }
}

export interface StageModelRelations {
  // describe navigational properties here
}

export type StageModelWithRelations = StageModel & StageModelRelations;
