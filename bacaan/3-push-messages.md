# Push Messages

PWA memiliki 2 API, Push API dan Notifications API, keduanya adalah API berbeda tetapi bisa digunakan untuk memberikan fungsionalitas yang bisa menarik pengguna. Push API digunakan untuk mengerimkan konten baru dari server ke aplikasi tanpa adanya campur tangan dari aplikasi _client side_, dan berjalan di service worker. Notifications API bisa digunakan oleh service worker untuk memberikan informasi kepada user berupa notifikasi di sistem operasi.

Keduanya berjalan di service worker, sehingga update konten dari server dan notifikasi bisa ditampilkan ketika aplikasi tidak sedang dibuka.

## Notifications API

### Request permission

Sebelum bisa menampilkan notifikasi, aplikasi harus meminta _permission_ untuk mengirimkan notifikasi.

```js
Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
        // Send notification
        randomNotification()
    }
})

function randomNotification() {
    new Notification('Just Notification', {
        body: 'This is test notification',
        icon: 'icon.jpg'
    })
}

```

### Push

Push lebih kompleks, aplikasi diharuskan _subscribe_ ke sebuah server yang akan mengirim data ke aplikasi, selanjutnya service worker di aplikasi akan menerima data dari push server, kemudian menampilkannya dengan _notification system_.

Di dalam berkas `main.js` ketika register service worker, tambahkan bagian `registration.pushManager.getSubscription()` agar aplikasi _subscribe_ ke push service.

```js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            // registration success

            return registration.pushManager.getSubscription()
                .then(async function(subscription) {
                    // if subscription found, return it
                    if (subscription) {
                        return subscription
                    }

                    // otherwise, subscribe a new one

                    return registration.pushManager.subscribe({
                        userVisibleOnly: true
                    })
                })
        })
        .then(function (subscription) {
            fetc('https://server.domain/pushregistrationendpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription
                })
            })
        })
        .catch(function (error) {
            console.log('Service worker registration failed', error)
        })
}
```