import { Record } from "../classes/Record";
const INVALID_CONSTRUCTOR_PARAM = `Text or Obj arg must a string or an object with the appropriate post keys.`;

export interface IPost {
  id: number;
  date: string;
  description?: string;
  text?: string;
}

class Post extends Record<Post> implements IPost {
  public id: number;
  public text: string;
  public date: string;

  public constructor(id?: number, text?: string, date?: string) {
    super();
    this.id = id ?? -1;
    this.text = text ?? "";
    this.date = date ?? "";
  }

  from(param: object): Post {
    if (!Post.isPost(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }

    const p = param as IPost;
    return new Post(p.id, p.text, p.date);
  }

  objectIsValid(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === "object" &&
      "id" in arg &&
      "date" in arg &&
      "text" in arg
    );
  }

  public static get isPost(): (arg: unknown) => boolean {
    return (arg: unknown) => this.prototype.objectIsValid(arg);
  }
}

export default Post;
