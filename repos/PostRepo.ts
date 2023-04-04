import Repo from "../classes/Repo";
import { IPost } from "../models/Post";

// @ts-ignore
class PostRepo extends Repo<IPost> {
  constructor() {
    super("posts.json");
  }

  // @ts-ignore
  protected get tableName(): keyof Repo<IPost> {
    // @ts-ignore
    return "posts";
  }

  protected generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

  async getOne(id: number, key = "id"): Promise<IPost | null> {
    return super.getOne(id, key);
  }

  async persists(id: number): Promise<boolean> {
    return super.persists(id);
  }

  async getAll(): Promise<IPost[]> {
    const posts = super.getAll();
    return posts;
  }

  async add(post: IPost): Promise<void> {
    return super.add(post);
  }

  async update(obj: IPost): Promise<void> {
    return super.update(obj);
  }

  async delete(id: number): Promise<void> {
    return super.delete(id);
  }

  // * Add your custom methods here
  static async sayHelloFromPostRepo(): Promise<void> {
    console.log("Hello from post!");
  }
}

export default PostRepo;
