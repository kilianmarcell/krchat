class Pwa {
  #serviceWorkerRegistration?: ServiceWorkerRegistration;
  constructor() {
    // Only register service worker in production to avoid interfering with Vite dev server
    const isProduction = import.meta.env?.PROD ?? false;
    if (isSecureContext) {
      if (isProduction) {
        (async () => {
          this.#serviceWorkerRegistration =
            await navigator.serviceWorker.register("/sw.js");
        })();
      } else {
        // In development, unregister any existing service workers to prevent interference
        (async () => {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
            console.log("Unregistered service worker for development mode");
          }
        })();
      }
    }
  }
}
export const pwa = new Pwa();
