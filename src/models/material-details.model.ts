import {Model, model, property} from '@loopback/repository';
import {MaterialUpdateModel} from './material-update.model';

@model({settings: {strict: false}})
export class MaterialsModel extends Model {

  @property({
    type: 'array',
    itemType: 'object'
  })
  materials?: [MaterialUpdateModel];
  
  constructor(data?: Partial<MaterialsModel>) {
    super(data);
  }
}

export interface MaterialsModelRelations {
  // describe navigational properties here
}

export type MaterialsModelWithRelations = MaterialsModel & MaterialsModelRelations;
