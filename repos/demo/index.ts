import PostRepo from "../PostRepo";

const postRepo = new PostRepo();

(async () => {
  const post1 = {
    id: 1,
    date: "01/01/2023",
  };
  await postRepo.add(post1);

  const post2 = {
    id: 2,
    date: "01/01/2024",
  };
  await postRepo.add(post2);

  const posts = await postRepo.getAll();
  console.log(posts);

  const postById = await postRepo.getOne(1);
  console.log(postById);

  post1.date = "01/01/2025";
  await postRepo.update(post1);

  await postRepo.delete(2);
})();
