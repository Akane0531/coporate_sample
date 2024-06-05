import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

export const getCategories = async () => {
  const posts = await getCollection('posts');
  const categories = new Set(posts.map((post) => post.data.category));
  return Array.from(categories);
};

export const getTags = async () => {
  const posts = await getCollection('posts');
  const uniqueTags = new Set(posts.map((post) => post.data.tags).flat());
  return Array.from(uniqueTags);
};

export const getPosts = async (max?: number) => {
  return (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, max);
};

export const getRelatedPosts = async (slug: string) => {
  const posts = await getCollection('posts');
  // const slug = post.slug;
  const index = posts.findIndex((post) => post.slug === slug);
  console.log('🚀 ~ getRelatedPosts ~ index:', index);
  return {
    prev: posts[index - 1],
    next: posts[index + 1],
  };
};

export const getPostByTag = async (tag: string) => {
  const posts = await getPosts();
  const lowercaseTag = tag.toLowerCase();
  return posts.filter((post) => {
    return post.data.tags.some((postTag: string) => postTag.toLowerCase() === lowercaseTag);
  });
};

export const filterPostsByCategory = async (category: string) => {
  const posts = await getPosts();
  return posts.filter((post) => post.data.category.toLowerCase() === category);
};

export const getSinglePage = async <C extends CollectionKey>(collectionName: C): Promise<CollectionEntry<C>[]> => {
  const allPages = await getCollection(collectionName);
  const removeIndex = allPages.filter((data) => data.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((data) => !data.data.draft);
  return removeDrafts;
};
