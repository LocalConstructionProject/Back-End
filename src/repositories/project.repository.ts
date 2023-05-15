import {MongoClient, ObjectId} from 'mongodb';

export class ProjectRepository {

  constructor() {

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

}
