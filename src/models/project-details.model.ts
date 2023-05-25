import {Model, model, property} from '@loopback/repository';
import {StageUpdateModel} from './stage-update.model';

@model({settings: {strict: false}})
export class ProjectDetails extends Model {
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
    type: 'date',
    default: new Date(),
  })
  createdDate?: string;

  @property({
    type: 'string',
    default: "Dhalavaipuram",
  })
  location?: string;

  @property({
    type: 'number',
  })
  contact?: number;

  @property({
    type: 'array',
    itemType: 'object'
  })
  stages?: [StageUpdateModel];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProjectDetails>) {
    super(data);
  }
}

export interface ProjectDetailsRelations {
  // describe navigational properties here
}

export type ProjectDetailsWithRelations = ProjectDetails & ProjectDetailsRelations;