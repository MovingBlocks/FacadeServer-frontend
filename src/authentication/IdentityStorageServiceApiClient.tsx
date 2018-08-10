import {ApiCallOptions, GenericRestClient} from "simplerestclients";
import {Promise, Rejected} from "synctasks";
import {ClientIdentity} from "./ClientIdentity";

export interface LoginResult {
  token: string;
}

export interface ClientIdentityResponse {
  clientIdentity: ClientIdentity<string>;
}

export class IdentityStorageServiceApiClient extends GenericRestClient {

  private sessionToken: string;

  public constructor(server: string) {
    if (!/^https?:\/\//.test(server)) {
      server = "http://" + server;
    }
    if (!/\/$/.test(server)) {
      server = server + "/";
    }
    super(server);
  }

  public login(login: string, password: string): Promise<null> {
    return this.performApiPost("api/session", {login, password}).then(
      (result: LoginResult) => {this.sessionToken = result.token; },
      (result: any) => Rejected(result.body ? result.body.error : "Failed to connect to the server"),
    );
  }

  public getClientIdentity(serverId: string): Promise<ClientIdentity<string>> {
    return this.performApiGet<ClientIdentityResponse>("api/client_identity/" + serverId).then(
      (result: ClientIdentityResponse) => result.clientIdentity,
      (result: any) => Rejected(result.body.error),
    );
  }

  public logout(): Promise<null> {
    return this.performApiDelete("api/session");
  }

  protected _getHeaders(options: ApiCallOptions): {[key: string]: string} {
    const headers = super._getHeaders(options);
    headers["Session-Token"] = this.sessionToken;
    return headers;
  }
}
