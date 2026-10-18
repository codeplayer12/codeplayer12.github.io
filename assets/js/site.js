// Mobile menu
(() => {
  const btn = document.querySelector('.menu-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = document.body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar')) {
      document.body.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { document.body.classList.remove('nav-open'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();

// Copy buttons on code blocks
document.querySelectorAll('.prose pre').forEach((pre) => {
  const b = document.createElement('button');
  b.className = 'copy-btn';
  b.type = 'button';
  b.textContent = 'copy';
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.innerText.replace(/copy$/, '').trim());
      b.textContent = 'copied';
    } catch { b.textContent = 'failed'; }
    setTimeout(() => (b.textContent = 'copy'), 1500);
  });
  pre.appendChild(b);
});

// Search page
(() => {
  const input = document.getElementById('q');
  if (!input || !window.SEARCH_INDEX) return;
  const out = document.getElementById('results');
  const status = document.getElementById('search-status');
  let posts = [];
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hl = (text, terms) => {
    let h = esc(text);
    terms.forEach((t) => { h = h.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
    return h;
  };

  const run = () => {
    const q = input.value.trim().toLowerCase();
    const url = new URL(location);
    q ? url.searchParams.set('q', q) : url.searchParams.delete('q');
    history.replaceState(null, '', url);
    out.innerHTML = '';
    if (!q) { status.textContent = posts.length + ' posts indexed'; return; }
    const terms = q.split(/\s+/).filter(Boolean);
    const hits = posts
      .map((p) => {
        const hay = (p.title + ' ' + p.tags.join(' ') + ' ' + p.body).toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        let score = 0;
        terms.forEach((t) => {
          if (p.title.toLowerCase().includes(t)) score += 10;
          if (p.tags.join(' ').toLowerCase().includes(t)) score += 5;
          score += hay.split(t).length - 1;
        });
        return { p, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    status.textContent = hits.length + (hits.length === 1 ? ' match' : ' matches');
    out.innerHTML = hits.map(({ p }) => `
      <li>
        <time>${p.date}</time>
        <h3><a href="${p.url}">${hl(p.title, terms)}</a></h3>
        <p>${hl(p.summary, terms)}</p>
        ${p.tags.length ? `<p class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</p>` : ''}
      </li>`).join('');
  };

  fetch(window.SEARCH_INDEX)
    .then((r) => r.json())
    .then((data) => {
      posts = data;
      const q = new URLSearchParams(location.search).get('q');
      if (q) input.value = q;
      run();
    })
    .catch(() => { status.textContent = 'Search index failed to load.'; });
  input.addEventListener('input', run);
})();
