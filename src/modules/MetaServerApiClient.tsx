import {GenericRestClient} from "simplerestclients";
import {Promise} from "synctasks";
import {ModuleMetadata} from "./ModuleMetadata";

export class MetaServerApiClient extends GenericRestClient {

  public static getInstance(): MetaServerApiClient {
    return MetaServerApiClient.instance;
  }

  private static instance: MetaServerApiClient = new MetaServerApiClient();

  private constructor() {
    super("http://meta.terasology.org/");
  }

  public getAllModules(): Promise<ModuleMetadata[]> {
    return this.performApiGet<ModuleMetadata[]>("modules/list/latest");
  }

}
