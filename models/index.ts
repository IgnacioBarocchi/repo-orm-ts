export abstract class TObject<T> {
  abstract from(param: object): T;
  abstract objectIsValid(arg: unknown): boolean;
}
