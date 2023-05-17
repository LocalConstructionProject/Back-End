import {MongoClient, ObjectId} from 'mongodb';
import {LabourModel, MaterialsModel, StageModel} from '../models';

export class ProjectRepository {

  constructor() {

  }

  async createNewProject(client: MongoClient, messageOnSuccess: string,toBeUpdated: any): Promise<any> {
    const collection = client.db('Main').collection('ConstructionProject');

    const updateFilter = {
      $set:
      toBeUpdated,
    };
    const cursor = collection.insertOne(updateFilter);
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
    if (result !== undefined && result.length > 0) {
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
        data: result[0],
      };
    }
  }

  async updateMaterialPrice(client: MongoClient, messageOnSuccess: string, model: MaterialsModel): Promise<any> {
    const collection = client.db('Main').collection('MaterialList');
    var data: any[] = [];
    model.materials?.map(async (value) => {
      const filter = {
        'id': value.id
      };

      const updateFilter = {
        $set:
          {
            'amount': value.price
          },
      };

      const cursor = collection.findOneAndUpdate(filter, updateFilter, {upsert: true});
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
    }
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
        data: result[0],
      };
    }
  }

  async updateLabourPrice(client: MongoClient, messageOnSuccess: string, model: LabourModel): Promise<any> {
    const collection = client.db('Main').collection('LabourList');
    var data: any[] = [];
    model.labours?.map(async (value) => {
      const filter = {
        'id': value.id
      };

      const updateFilter = {
        $set:
          {
            'amount': value.price
          },
      };

      const cursor = collection.findOneAndUpdate(filter, updateFilter, {upsert: true});
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
    }
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
        data: result[0],
      };
    }
  }

  async updateStagesPrice(client: MongoClient, messageOnSuccess: string, model: StageModel): Promise<any> {
    const collection = client.db('Main').collection('StagesList');
    var data: any[] = [];
    model.stages?.map(async (value) => {
      const filter = {
        'id': value.id
      };

      const updateFilter = {
        $set:
          value,
      };

      const cursor = collection.findOneAndUpdate(filter, updateFilter, {upsert: true});
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
    }
  }

}
