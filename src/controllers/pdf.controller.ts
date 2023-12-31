import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  oas, Response, requestBody, getModelSchemaRef,
} from '@loopback/rest';
import {ProjectRepository} from '../repositories/project.repository';
import {ProjectDetails} from '../models';

import {authenticate} from '@loopback/authentication';

/**
 * A simple controller to bounce back http requests
 */
@authenticate('basic')
export class PdfController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  repository = new ProjectRepository();

  @get('/v1/files')
  @oas.response.file()
  async downloadFile(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProjectDetails, {
            title: 'ProjectDetails',
            exclude: [],
          }),
        },
      },
    })
      projectInfo: ProjectDetails,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const data = await this.repository.createPdfFile()
    response.download(data.filename);
    return response;
  }
}
