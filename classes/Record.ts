export abstract class Record<T> {
  abstract from(param: object): T;
  abstract objectIsValid(arg: unknown): boolean;
}
