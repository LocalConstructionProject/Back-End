import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  oas, Response, requestBody, getModelSchemaRef,
} from '@loopback/rest';
import {ProjectRepository} from '../repositories/project.repository';

import {authenticate} from '@loopback/authentication';
import {QuizQuestionsModel} from '../models/quiz-questions.model';

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
          schema: getModelSchemaRef(QuizQuestionsModel, {
            title: 'QuizQuestionsModel',
          }),
        },
      },
    })
      requestData: QuizQuestionsModel,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const data = await this.repository.createPdfFile(requestData)
    response.download(data.filename);
    return response;
  }
}
