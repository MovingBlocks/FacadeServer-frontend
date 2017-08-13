import RX = require("reactxp");

export class CollectionStorage<T> {

  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public add(item: T, then?: () => void): void {
    this.load((oldCollection: T[]) => {
      this.save(oldCollection.concat([item]), then);
    });
  }

  public removeFirst(predicate: (item: T) => boolean, then?: () => void): void {
    this.load((collection: T[]) => {
      const index: number = this.findIndex(collection, predicate);
      if (index > -1) {
        collection.splice(index, 1);
        this.save(collection, then);
      } else {
        then();
      }
    });
  }

  public getFirstMatch(predicate: (item: T) => boolean, then: (foundItem: T) => void): void {
    this.load((collection: T[]) => {
      const filtered: T[] = collection.filter(predicate);
      then(filtered.length > -1 ? filtered[0] : null);
    });
  }

  public getAll(then: (collection: T[]) => void): void {
    this.load(then);
  }

  private save(data: T[], then: () => void): void {
    RX.Storage.setItem(this.collectionName, JSON.stringify(data)).then(this.safeFunc(then));
  }

  private load(then: (result: T[]) => void): void {
    RX.Storage.getItem(this.collectionName).then((data: string) =>
      then(data !== null ? JSON.parse(data) as T[] : []));
  }

  private safeFunc(f: () => void): () => void {
    return f ? f : () => {return; };
  }

  private findIndex(array: T[], predicate: (value: T) => boolean) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }
}
