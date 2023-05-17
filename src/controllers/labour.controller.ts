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
import {LabourModel} from '../models';

/**
 * A simple controller to bounce back http requests
 */
@authenticate('basic')
export class LabourController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {
  }

  repository = new ProjectRepository();

  @get('/v1/labour/{id}')
  getProjectById(
    @param.path.string('id') id: string,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        if (id === 'all') {
          resolve(this.repository.getAllLabourDetails(client, 'Labour details received successfully.'));
        } else {
          resolve(this.repository.getLabourInformation(client, 'Labour details received successfully.', id));
        }
      });
    });
  }

  @post('/v1/labour/update')
  updateProjectInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LabourModel, {
            title: 'LabourModel',
            exclude: [],
          }),
        },
      },
    })
      labourModel: LabourModel,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        resolve(this.repository.updateLabourPrice(client, 'Labour Price Updated successfully.', labourModel));
      });
    });
  }
}
