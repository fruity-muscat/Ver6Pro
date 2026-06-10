const CACHE_NAME = "ver6pro-v1";

const urlsToCache = [
    "./",
    "./Ver6Pro.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


/* インストール */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(
                    urlsToCache
                );

            })

        );

    }
);


/* リクエスト */

self.addEventListener("fetch", event => {

    if (event.request.mode === "navigate") {

        event.respondWith(

            caches.match("./index.html")
            .then(response => {
                return response || fetch(event.request);
            })

        );

        return;
    }

    event.respondWith(

        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })

    );

});


/* 更新 */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(
                            key !== CACHE_NAME
                        ){

                            return caches.delete(
                                key
                            );

                        }

                    })

                );

            })

        );

    }
);