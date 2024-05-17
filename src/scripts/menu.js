// NOTE view transitions を 利用する場合 astro:page-load が無いとページ遷移後の要素にイベントリスナーが付与されない https://docs.astro.build/ja/tutorials/add-view-transitions/#update-scripts
document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});
