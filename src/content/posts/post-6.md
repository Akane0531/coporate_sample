---
title: タグ・カテゴリーの取得について
pubDate: 2024-06-25
description: 'これは私の新しいAstroブログの最初の記事です。'
author: 'Astro学習者'
image:
  url: 'https://docs.astro.build/assets/arc.webp'
  alt: 'Astroのロゴ。'
category: 'Astro'
tags: ['astro', 'タグ', 'カテゴリー']
---


# ディレクトリについて

```
src
├ utils
│ ├ post.ts
│ └ index.ts
├ pages
│ └ index.astro
└ (略)
```

# 基本のパターン


投稿データの取得に関連する関数を纏めるファイル `src/utils/post.ts` を作成。

```ts
// src/utils/post.astro

import { getCollection } from 'astro:content';

export const getCategories = async () => {
  const posts = await getCollection('posts');
  const categories = new Set(posts.map((post) => post.data.category));
  return Array.from(categories);
};

```
index.ts にエクスポートを纏めています。
```ts
// src/utils/index.ts
export { getCategories } from './post';
```

index.astro でimportして利用する。

```astro
// src/pages/index.astro
---
import { getCategories } from '@/utils'; // パスは任意のものに
const categories = await getCategories();
---

<dl class='categories'>
  <dt>Category</dt>
  {
    categories.map((category: string) => (
      <dd>
        <a href={`/categories/${category}`}>{category}</a>
      </dd>
    ))
  }
</dl>

```

# 投稿件数も含める場合

```ts
// src/utils/post.astro
import { getCollection } from 'astro:content';

export const getCategories = async () => {
  const posts = await getCollection('posts');
  const categories = new Map();

  posts.forEach((post) => {
    const category = post.data.category;

    if (categories.has(category)) {
      categories.set(category, categories.get(category) + 1);
    } else {
      categories.set(category, 1);
    }
  });

  return Array.from(categories, ([name, count]) => ({ name, count }));
};

```


```astro
// src/pages/index.astro
---
import { getCategories } from '@/utils'; // パスは任意のものに
const categories = await getCategories();
---

<dl class='categories'>
  <dt>Category</dt>
  {
    categories.map(({ name, count }) => (
      <dd>
        <a class='categories__link' href={`/categories/${name}`}>
          {name}
        </a>
        <span class='categories__count'>{count}</span>
      </dd>
    ))
  }
</dl>

```