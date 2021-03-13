const unsplash = require('./unsplashApi')

const mapPhotos = photos => {
    return photos.response.results.map(photo => ({
        id: photo.id,
        width: photo.width,
        height: photo.height,
        color: photo.color,
        blur_hash: photo.blur_hash,
        urls: photo.urls,
        links: photo.links,
        likes: photo.likes,
        user: {
            id: photo.user.id,
            username: photo.user.username,
            name: photo.user.name,
            links: photo.user.links,
            profile_image: photo.user.profile_image
        }
    }))
}

const getPhotos = page => new Promise( async (resolve, reject) => {

    try {
        const photos = await unsplash.photos.list({ page: page, perPage: 20 })

        resolve(mapPhotos(photos))
    } catch (e) {
        reject(e)
    }
})

module.exports = {
    getPhotos
}