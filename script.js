// Renders the post list on index.html and handles tag filtering.
(function () {
  var listEl = document.getElementById('post-list');
  var tagButtons = document.querySelectorAll('.tag-btn');
  var activeTag = 'all';
  var posts = [];

  var TAG_LABELS = { biblical: 'Biblical', technical: 'Technical' };

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function render() {
    var filtered = activeTag === 'all' ? posts : posts.filter(function (p) { return p.tag === activeTag; });

    if (!filtered.length) {
      listEl.innerHTML = '<p class="empty-state">No posts in this category yet.</p>';
      return;
    }

    listEl.innerHTML = filtered
      .map(function (p) {
        return (
          '<article class="post-card">' +
          '<div class="post-card__meta">' +
          '<span class="tag-badge tag-badge--' + p.tag + '">' + TAG_LABELS[p.tag] + '</span>' +
          '<span class="post-date">' + formatDate(p.date) + '</span>' +
          '</div>' +
          '<h2 class="post-card__title"><a href="posts/' + p.slug + '.html">' + p.title + '</a></h2>' +
          '<p class="post-card__excerpt">' + p.excerpt + '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTag = btn.getAttribute('data-tag');
      tagButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      render();
    });
  });

  fetch('posts.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      // newest first
      posts = data.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
      render();
    })
    .catch(function () {
      listEl.innerHTML = '<p class="empty-state">Couldn\u2019t load posts right now.</p>';
    });
})();
