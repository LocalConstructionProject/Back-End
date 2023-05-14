import * as config from './mongodb.datasource.json';

import {MongoClient} from 'mongodb';

export class MongoDatasource {

  private static instance: MongoDatasource;
  static client: MongoClient;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {

  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static async getClient() {
    if (!MongoDatasource.instance) {
      MongoDatasource.instance = new MongoDatasource();
      this.client = await MongoClient.connect(
        config.url,
      );
    }
    return MongoDatasource.client;
  }
}
