import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  param, post, getModelSchemaRef, requestBody,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {ProjectRepository} from '../repositories/project.repository';
import {MongoDatasource} from '../datasources';
import {StageModel} from '../models';

/**
 * A simple controller to bounce back http requests
 */
@authenticate('basic')
export class StagesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {
  }

  repository = new ProjectRepository();

  @get('/v1/stages/{id}')
  getProjectById(
    @param.path.string('id') id: string,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        if (id === 'all') {
          resolve(this.repository.getAllStagesDetails(client, 'Stages details received successfully.'));
        } else {
          resolve(this.repository.getStagesInformation(client, 'Stages details received successfully.', id));
        }
      });
    });
  }

  @post('/v1/stages/update')
  updateProjectInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StageModel, {
            title: 'StagesModel',
            exclude: [],
          }),
        },
      },
    })
      stagesModel: StageModel,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        resolve(this.repository.updateStagesPrice(client, 'Stages Price Updated successfully.', stagesModel));
      });
    });
  }
}
