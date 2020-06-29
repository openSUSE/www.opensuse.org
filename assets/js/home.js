// News
(function () {
  const grid = document.getElementById('news-grid');

  function getItemData(element) {
    const data = {};
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i];
      const name = child.tagName;
      const value = child.textContent || child.getAttribute('url') || '';
      data[name] = value.trim();
    }
    return data;
  }

  function insertCard(data, index) {
    const card = document.createElement('div');
    card.className = 'grid-item';
    card.innerHTML = `
      <a class="card" href="${data.link}">
        <img src="https://news.opensuse.org${data.enclosure}" class="card-img-top bg-light" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
        </div>
        <footer class="card-footer">
          <p class="card-text text-muted">${new Date(data.pubDate).toDateString()}</p>
        </footer>
      </a>
    `;
    grid.append(card);
  }

  fetch('https://news.opensuse.org/feed.xml').then(function (res) {
    return res.text();
  }).then(function (text) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(text, 'text/xml');
    const itemElements = dom.getElementsByTagName('item');
    for (let i = 0; i < itemElements.length; i++) {
      const itemElement = itemElements.item(i);
      const itemData = getItemData(itemElement);
      insertCard(itemData, i);
    }
    const msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 20
    });
    imagesLoaded(grid).on('progress', function () {
      msnry.layout();
    });
  });
})();
