# Example PWA update

PWA **NEW UPDATE AVAILABLE** example.

- `create-react-app@3.4.0` with `@material-ui/core@^4.9.7`
- `@vue/cli@4.2.3` with `vuetify@^2.2.11`

Since [a message listener added when `skipWaiting: false`, we can update the PWA with `workbox` version `^4.1.0` ~ `^4.3.1`](https://github.com/GoogleChrome/workbox/commit/a6ad817768603c83617f57e2018f7a8e0e2e1f52#diff-17816c5f9556299f1fe5777ea348ae82R37).

## Steps

1. Use [`register-service-worker`](https://github.com/yyx990803/register-service-worker) to listen on `updated` event
2. When `updated` triggered, declare a function to [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) with `{ type: SKIP_WAITING }` to the waiting worker, and it will make the worker [`skipWaiting()`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting).
3. When the user click the **REFRESH** button, make the waiting worker `skipWaiting()`, [`update()`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update) the [registration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) and [`reload()`](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload). Now the latest app is loaded.

## Demo

Choose a framework:

```sh
# React
cd react

# Vue
cd vue
```

Build the production and serve the app:

```sh
yarn build
```

Now open the browser and request `http://localhost:5000/`

_Optional: You can stop the web server and reload the page. You would see that the PWA still works even it's offline._

Build the production and serve the app again:

```sh
yarn build
```

Reload the page(not hard refresh) and you will see the update notification is pop-on as a snackbar. Click **REFRESH** and you'll see the body is changed.
