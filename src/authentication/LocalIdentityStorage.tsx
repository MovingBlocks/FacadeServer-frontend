import RX = require("reactxp");
import {CollectionStorage} from "../CollectionStorage";
import {ClientIdentity} from "./ClientIdentity";
import {MultiFormatBigInteger} from "./MultiFormatBigInteger";
import {MultiFormatClientIdentityUtil} from "./MultiFormatClientIdentityUtil";

export class LocalIdentityStorage {

  public static getIdentity(serverId: string, then: (result: ClientIdentity<MultiFormatBigInteger>) => void): void {
    LocalIdentityStorage.storage.getFirstMatch(
      (item: ClientIdentity<string>) => item.server.id === serverId,
      (result: ClientIdentity<string>) => then(MultiFormatClientIdentityUtil.buildFromBase64(result)),
    );
  }

  public static setIdentity(identity: ClientIdentity<MultiFormatBigInteger>): void {
    LocalIdentityStorage.removeIdentity(
      identity.server.id,
      () => LocalIdentityStorage.storage.add(MultiFormatClientIdentityUtil.extractBase64(identity)),
    );
  }

  public static removeIdentity(serverId: string, then?: () => void): void {
    LocalIdentityStorage.storage.removeFirst(
      (item: ClientIdentity<string>) => item.server.id === serverId,
      then,
    );
  }

  private static storage: CollectionStorage<ClientIdentity<string>> = new CollectionStorage<ClientIdentity<string>>("identities");

  private constructor() {
  }
}
