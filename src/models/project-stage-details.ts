import {Model, model, property} from '@loopback/repository';
import {StageEntryRecord} from './stage-entry-record';
import {randomUUID, UUID} from 'crypto';

@model({settings: {strict: false}})
export class ProjectStageDetails extends Model {

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  id: UUID = randomUUID();

  @property({
    type: 'date',
    default: new Date(),
  })
  startedDate?: string;

  @property({
    type: 'array',
    itemType: 'object'
  })
  entryRecords?: [StageEntryRecord];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProjectStageDetails>) {
    super(data);
  }
}

export interface ProjectStageDetailsRelations {
  // describe navigational properties here
}

export type ProjectStageDetailsWithRelations = ProjectStageDetails & ProjectStageDetailsRelations;
