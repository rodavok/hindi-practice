"use strict";
/* Service worker for the installable web app (dist/web/). tools/build.js fills in VERSION from the page's
   content, so every new build is a new worker: the browser fetches it, caches the new page, and the app
   shows the new version the next time it is opened. Until then, and offline, it runs from the cache. */
const VERSION = "/*VERSION*/";
const CACHE = "hindi-practice-" + VERSION, FONTS = "hindi-practice-fonts";
const CORE = ["./", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("hindi-practice-") && k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Google Fonts: serve the saved copy, refresh it in the background.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; });
      if (hit){ e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // The app itself: cache first (the page is one file and only changes with a new worker), network as a fallback.
  e.respondWith(caches.open(CACHE).then(c =>
    c.match(req.mode === "navigate" ? "./" : req, {ignoreSearch: true}).then(hit => hit || fetch(req))));
});
