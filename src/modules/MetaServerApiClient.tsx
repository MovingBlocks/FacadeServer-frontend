import {GenericRestClient} from "simplerestclients";
import {Promise} from "synctasks";
import {Module} from "./Module";

export class MetaServerApiClient extends GenericRestClient {

  public static getInstance(): MetaServerApiClient {
    return MetaServerApiClient.instance;
  }

  private static instance: MetaServerApiClient = new MetaServerApiClient();

  private constructor() {
    super("http://meta.terasology.org/");
  }

  public getAllModules(): Promise<Module[]> {
    return this.performApiGet<Module[]>("modules/list/latest");
  }

}
