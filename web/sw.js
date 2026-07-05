/* Terminal Quest — service worker: cache-first precache of the whole game.
   MAINTENANCE CONTRACT: when you add/remove a file, update the <script> list in
   index.html, the ASSETS list below, and bump CACHE — deployed changes only reach
   installed clients after the version bump. */
const CACHE = 'terminal-quest-v7';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  // keep in sync with the <script> tags in index.html:
  './js/i18n.js',
  './js/lang_th.js',
  './js/lang_th_realms_a.js',
  './js/lang_th_realms_b.js',
  './js/lang_th_realms_c.js',
  './js/lang_th_void.js',
  './js/vfs.js',
  './js/commands.js',
  './js/cloud.js',
  './js/git.js',
  './js/docker.js',
  './js/sprites.js',
  './js/gear.js',
  './js/fxmap.js',
  './js/stage.js',
  './js/battle.js',
  './js/sfx.js',
  './js/achievements.js',
  './js/engine.js',
  './js/content_bash.js',
  './js/content_net.js',
  './js/content_cloud.js',
  './js/content_git.js',
  './js/content_docker.js',
  './js/content_ops.js',
  './js/content_final.js',
  './js/content_void.js',
  './js/ui_resize.js',
  './js/main.js',
  // WebGL HD-2D stage (ES modules + vendored Three):
  './js/vendor/three.module.min.js',
  './js/stage3d/stage3d.js',
  './js/stage3d/texgen.js',
  './js/stage3d/themes3d.js',
  './js/stage3d/scenebuilder.js',
  './js/stage3d/sprites3d.js',
  './js/stage3d/overworld3d.js',
  './js/stage3d/post.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// During local development, let every request hit the network (the dev server
// disables HTTP caching) so edits show up on plain reload. Cache-first only in
// production (GitHub Pages / any non-localhost origin).
const DEV = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

self.addEventListener('fetch', (e) => {
  if (DEV || e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
