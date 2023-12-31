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
import {ProjectDetails} from '../models';

/**
 * A simple controller to bounce back http requests
 */
@authenticate('basic')
export class CommonController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {
  }

  repository = new ProjectRepository();

  @get('/v1/project/{id}')
  getProjectById(
    @param.path.string('id') id: string,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        if (id === 'all') {
          resolve(this.repository.getAllProjectDetails(client, 'Project details received successfully.'));
        } else {
          resolve(this.repository.getProjectInformation(client, 'Project details received successfully.', id));
        }
      });
    });
  }

  @get("/v1/project/delete/{id}")
  deleteProjectById(
    @param.path.string('id') id: string,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
          resolve(this.repository.deleteProjectInformation(client, 'Project removed successfully.', id));
      });
    });
  }

  @post('/v1/project/update')
  updateProjectInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectDetails, {
            title: 'ProjectDetails',
          }),
        },
      },
    })
      projectInfo: ProjectDetails,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        resolve(this.repository.updateProjectInfo(client, 'Project details received successfully.', projectInfo._id, projectInfo));
      });
    });
  }

  @post('/v1/project/create')
  createProject(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectDetails, {
            title: 'ProjectDetails',
          }),
        },
      },
    })
      projectInfo: ProjectDetails,
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return new Promise<any>((resolve, reject) => {
      MongoDatasource.getClient().then(client => {
        resolve(this.repository.createNewProject(client, 'Project created successfully.', projectInfo));
      });
    });
  }
}
