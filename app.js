/* =============================================
   ECHO PODCAST – App Logic
   ============================================= */

let previousPage = 'explore';
let isPlaying = true;

// ─── PAGE NAVIGATION ──────────────────────────
function showPage(pageId) {
  // Track previous for back button
  const current = document.querySelector('.page.active');
  if (current && current.id !== 'page-' + pageId) {
    previousPage = current.id.replace('page-', '');
  }

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) link.classList.add('active');
  });

  // Scroll to top
  document.querySelector('.main-content').scrollTop = 0;
}

function goBack() {
  showPage(previousPage || 'explore');
}

// ─── PLAYER ───────────────────────────────────
function togglePlay() {
  isPlaying = !isPlaying;
  const btn = document.getElementById('play-btn');
  btn.textContent = isPlaying ? '⏸' : '▶';
}

function setPlayer(title, show) {
  document.getElementById('player-title').textContent = title;
  document.getElementById('player-show').textContent = show;
  isPlaying = true;
  document.getElementById('play-btn').textContent = '⏸';
}

function playNow() {
  setPlayer('The Daily Tech – Latest Episode', 'Sarah Chen');
}

function prevTrack() {
  // Visual feedback
  flash('prev');
}

function nextTrack() {
  flash('next');
}

function flash(direction) {
  const btn = document.querySelector(direction === 'prev' ? '.ctrl-btn:first-child' : '.ctrl-btn:last-child');
  if (btn) {
    btn.style.color = 'var(--accent2)';
    setTimeout(() => btn.style.color = '', 300);
  }
}

// ─── TABS (Podcast Detail) ────────────────────
function switchTab(tabEl, contentId) {
  // Deactivate all tabs and content
  tabEl.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  // Activate selected
  tabEl.classList.add('active');
  const content = document.getElementById(contentId);
  if (content) content.classList.add('active');
}

// ─── SEARCH (basic filter) ────────────────────
document.querySelector('.search-bar input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const charts = document.querySelectorAll('.chart-item');
  charts.forEach(item => {
    const title = item.querySelector('.chart-title')?.textContent.toLowerCase() || '';
    item.style.display = (!query || title.includes(query)) ? 'flex' : 'none';
  });
});

// ─── INIT ─────────────────────────────────────
// Set "Explore" as the default active page on load
document.addEventListener('DOMContentLoaded', () => {
  showPage('explore');
});
