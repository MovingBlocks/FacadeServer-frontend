import {GenericRestClient} from "simplerestclients";
import {Promise} from "synctasks";
import {Module} from "./Module";

// TODO: at the moment this is not used.
// TODO: this was part of an attempt to directly load the kmodule list from the meta server
// TODO: but at the moment that's not possible from a browsersince the endpoints don't support CORS
// TODO: this file should probably be deleted
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
