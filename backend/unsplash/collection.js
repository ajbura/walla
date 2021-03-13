const unsplash = require('./unsplashApi')
const { searchCollection } = require('./search');


const getCollectionPhotos = collectionId => new Promise( async (resolve, reject) => {
    try {
        const photos = await unsplash.collections.getPhotos({ collectionId: collectionId, page: 1, perPage: 20})
        resolve(photos)
    } catch (e) {
        reject(e)
    }
})

const mapCollection = (collection, photos) => {
    return {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        total_photos: collection.total_photos,
        user: {
            id: collection.user.id,
            username: collection.user.username,
            name: collection.user.name,
            links: collection.user.links,
            profile_image: collection.user.profile_image
        },
        photos: (() => {
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
        })()
    }
}

const getCollection = name => new Promise( async (resolve, reject) => {

    try {
        const collection = await searchCollection(name)
        const photos = await getCollectionPhotos(collection.id)

        const mapedCollection = mapCollection(collection, photos)

        resolve(mapedCollection)

    } catch(e) {
        reject(e)
    }
})

module.exports = {
    getCollection
}