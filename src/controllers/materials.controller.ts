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
import {MaterialsModel} from '../models';

/**
 * A simple controller to bounce back http requests
 */
@authenticate('basic')
export class MaterialsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {
  }

  repository = new ProjectRepository();

  @get('/v1/materials/{id}')
  getProjectById(
    @param.path.string('id') id: string,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        if (id === 'all') {
          resolve(this.repository.getAllMaterialDetails(client, 'Material details received successfully.'));
        } else {
          resolve(this.repository.getMaterialInformation(client, 'Material detail of ' + id + ' received successfully.', id));
        }
      });
    });
  }

  @post('/v1/materials/update')
  updateProjectInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaterialsModel, {
            title: 'MaterialsModel',
            exclude: [],
          }),
        },
      },
    })
      materialModel: MaterialsModel,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        resolve(this.repository.updateMaterialPrice(client, 'Material Price Updated successfully.', materialModel));
      });
    });
  }
}
