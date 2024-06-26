---
title: アニメーションについて
pubDate: 2024-06-14
description: 'これは私の新しいAstroブログの最初の記事です。'
author: 'Astro学習者'
image:
  url: 'https://docs.astro.build/assets/arc.webp'
  alt: 'Astroのロゴ。'
category: 'Category 1'
tags: ['astro', 'ブログ', '公開学習']
---

当サイトでは[Motion One](https://motion.dev)というライブラリを採用しています。

# Motion Oneについて

## GSAPとの比較

|              | Motion One                                 | GSAP                                                   |
| ------------ | ------------------------------------------ | ------------------------------------------------------ |
| 評価         | 単純なアニメーションであれば ◎             | 非常に強力で、高度な機能を備えている。                 |
| ライセンス   | MIT                                        | [No Charge](https://gsap.com/licensing/)               |
| 構文         | シンプルで、初心者にとって扱いやすいかも。 | 構文は少々複雑で、慣れが必要。                         |
| 性能         | 高速で、あまりリソースを消費しないらしい。 | 非常に高性能だが、リソースを多く消費する可能性がある。 |
| カスタマイズ | カスタマイズ可能性は限定的。               | 非常に高度なカスタマイズが可能。                       |

個人的にはアニメーションをがっつり作りたい＆GSAPに慣れてしまっているので、物足りなさを感じる場面が多かった印象です。

また、GSAPの場合、ScrollTriggerが非常に便利なので、それらがない状態でアニメーションのタイミングを制御するのに試行錯誤しました。

# Motion Oneで画面内に入ったらアニメーションさせる

```tsx
import { stagger, inView, timeline, type TimelineDefinition } from 'motion';
const sequence = [
  ['.concept__desc > *', { opacity: [0, 1], x: [100, 0] }, { duration: 0.6, delay: stagger(0.1) }],
  ['.concept img', { opacity: [0, 1], y: [100, 0] }, { duration: 0.6 }],
] satisfies TimelineDefinition;

const tl = timeline(sequence, { duration: 1.6, autoplay: false });

inView('.concept', tl.play, { margin: '0px 0px -20% 0px' });
```

GSAPにおけるfromのような構文がないので、`opacity: [0, 1]` のように記述。

inViewはシンプルにIntersectionObserverっぽいので、ScrollTriggerのような各要素の位置を基準とした発火方法は難しそう。

timelineの第2引数のdurationで、タイムラインのアニメーションは自動的にスケーリングできる。
sequenceのアニメーション全体が3秒だとしても、timelineのdurationに縮小できるのはちょっと便利。
