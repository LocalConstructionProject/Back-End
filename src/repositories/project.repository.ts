import {MongoClient, ObjectId} from 'mongodb';
import {LabourModel, MaterialsModel, StageModel, StageUpdateModel} from '../models';
import data from './data.json';
import moment from 'moment';
import {QuizQuestionsModel} from '../models/quiz-questions.model';

const pdf = require('pdf-creator-node');
const fs = require('fs');
const html = fs.readFileSync('src/template.html', 'utf8');

export class ProjectRepository {

  constructor() {

  }

  async createNewProject(client: MongoClient, messageOnSuccess: string, toBeUpdated: any): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');

    const cursor = collection.insertOne(toBeUpdated);
    const result = await cursor;
    if (result !== undefined) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getAllProjectDetails(client: MongoClient, messageOnSuccess: string): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');
    const cursor = collection.find({});
    const result = await cursor.toArray();
    if (result !== undefined) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getProjectInformation(client: MongoClient, messageOnSuccess: string, id: String): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const cursor = collection.find(filter);//{projection: {_id: 0}}
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async deleteProjectInformation(client: MongoClient, messageOnSuccess: string, id: String): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const cursor = collection.deleteOne(filter);
    const result = await cursor;
    if (result !== undefined) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async updateProjectInfo(client: MongoClient, messageOnSuccess: string, id: string, toBeUpdated: any): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const updateFilter = {
      $set:
      toBeUpdated,
    };
    const cursor = collection.findOneAndUpdate(filter, updateFilter, {upsert: true});
    const result = await cursor;
    if (result !== undefined) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getAllMaterialDetails(client: MongoClient, messageOnSuccess: string): Promise<any> {
    const collection = client.db('Main').collection('MaterialList');
    const cursor = collection.find({});
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getMaterialInformation(client: MongoClient, messageOnSuccess: string, id: String): Promise<any> {
    const collection = client.db('Main').collection('MaterialList');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const cursor = collection.find(filter);//{projection: {_id: 0}}
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async updateMaterialPrice(client: MongoClient, messageOnSuccess: string, model: MaterialsModel): Promise<any> {
    const collection = client.db('Main').collection('MaterialList');
    var data: any[] = [];
    model.materials?.map(async (value) => {
      const filter = {
        'id': value.id,
      };

      const cursor = collection.findOneAndUpdate(filter, {
        $set: {
          name: value.name,
          amount: value.amount,
        },
      }, {upsert: true});
      const result = await cursor;
      if (result !== undefined) {
        data.push(result);
      }
    });

    return {
      status: 'Success',
      statusCode: 200,
      message: messageOnSuccess,
      data: data,
    };
  }

  async getAllLabourDetails(client: MongoClient, messageOnSuccess: string): Promise<any> {
    const collection = client.db('Main').collection('LabourList');
    const cursor = collection.find({});
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getLabourInformation(client: MongoClient, messageOnSuccess: string, id: String): Promise<any> {
    const collection = client.db('Main').collection('LabourList');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const cursor = collection.find(filter);
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async updateLabourPrice(client: MongoClient, messageOnSuccess: string, model: LabourModel): Promise<any> {
    const collection = client.db('Main').collection('LabourList');
    var data: any[] = [];
    model.labours?.map(async (value) => {
      const filter = {
        'id': value.id,
      };

      const cursor = collection.findOneAndUpdate(filter, {
        $set: {
          price: value.price,
          labourCount: value.labourCount,
          name: value.name,
          date: value.date,
          id: value.id,
          isPriceEditable: value.isPriceEditable,
        },
      }, {upsert: true});
      const result = await cursor;
      if (result !== undefined) {
        data.push(result);
      }
    });

    return {
      status: 'Success',
      statusCode: 200,
      message: messageOnSuccess,
      data: data,
    };
  }

  async getAllStagesDetails(client: MongoClient, messageOnSuccess: string): Promise<any> {
    const collection = client.db('Main').collection('StagesList');
    const cursor = collection.find({});
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async getStagesInformation(client: MongoClient, messageOnSuccess: string, id: String): Promise<any> {
    const collection = client.db('Main').collection('StagesList');
    const filter = {
      '_id': id as unknown as ObjectId,
    };

    const cursor = collection.find(filter);
    const result = await cursor.toArray();
    if (result !== undefined && result.length > 0) {
      return {
        status: 'Success',
        statusCode: 200,
        message: messageOnSuccess,
        data: result,
      };
    }
  }

  async insertAllStages(client: MongoClient, messageOnSuccess: string): Promise<any> {
    const collection = client.db('Main').collection('StagesList');
    var a: any[] = [];
    var t = 0;
    data.map(async (value) => {
      t += 1;
      const b = new StageUpdateModel();
      b._id = ObjectId.createFromTime(Date.now() + t);
      b.id = value.id;
      b.createdDate = Date();
      b.name = value.name;
      b.labourIds = value.labourIds.split(',');
      b.materialIds = value.materialIds.split(',');
      const cursor = collection.insertOne(b);
      const result = await cursor;
      if (result !== undefined) {
        a.push(result);
      }
    });

    return {
      status: 'Success',
      statusCode: 200,
      message: messageOnSuccess,
      data: data,
    };
  }

  async updateStagesPrice(client: MongoClient, messageOnSuccess: string, model: StageModel): Promise<any> {
    const collection = client.db('Main').collection('StagesList');
    var data: any[] = [];
    model.stages?.map(async (value) => {
      const filter = {
        'id': value.id,
      };

      const cursor = collection.findOneAndUpdate(filter, {$set: value}, {upsert: true});
      const result = await cursor;
      if (result !== undefined) {
        data.push(result);
      }
    });

    return {
      status: 'Success',
      statusCode: 200,
      message: messageOnSuccess,
      data: data,
    };
  }

  options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',

    footer: {
      height: '10mm',
      contents: {
        // first: 'Cover page',
        // 2: 'Second page', // Any page number is working. 1-based index
        default: '<span style="color: #444;">© Walk with Bible {{page}}</span>/<span>{{pages}}</span>', // fallback value
        // last: 'Last Page'
      },
    },
  };

  async createPdfFile(quiz:QuizQuestionsModel) {
    const fileName = (moment(Date())) + '.pdf';
    const document = {
      html: html,
      data: {
        questions: quiz.quizData,
        bookName: quiz.bookName,
        title: quiz.title,
      },
      path: 'src/files/' +  fileName,
      type: '',
    };
    return new Promise<any>((resolve, reject) => {
      pdf
        .create(document, this.options)
        .then((res: any) => {
          return resolve(res);
        })
        .catch((error: any) => {
          console.error(error);
          reject(error);
        }).finally(() => {
          // setTimeout(function () {
          //   fs.delete('src/files/'+fileName);
          // }, 5000);
        });
    });
  }

}
