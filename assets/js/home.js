// News
(function () {
  const flow = document.getElementById('news-flow');

  function getItemData(element) {
    const data = {};
    for (let i = 0; i < element.children.length; i++) {
      const name = element.children[i].tagName;
      const value = element.children[i].textContent;
      data[name] = value.trim();
    }
    return data;
  }

  function insertCard(data, index) {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-md-4 col-lg-3 mb-5';
    if (index === 8) {
      card.classList.add('d-none', 'd-md-block', 'd-lg-none');
    } else if (index === 9) {
      card.classList.add('d-none');
    }
    card.innerHTML = `
      <a class="card" href="${data.link}">
        <img src="https://news.opensuse.org/wp-content/uploads/2020/06/libreofficeos.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
        </div>
        <footer class="card-footer">
          <p class="card-text text-muted">${new Date(data.pubDate).toDateString()}</p>
        </footer>
      </a>
    `;
    flow.append(card);
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
  });
})();
