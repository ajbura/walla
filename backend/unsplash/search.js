const unsplash = require('./unsplashApi')

const getBigCollection = collections => {
    let collectionPhotos = 0;
    let collectionPosition = null;

    collections.forEach((collection, index) => {
        if (collection.total_photos > collectionPhotos) {
            collectionPhotos = collection.total_photos
            collectionPosition = index
        }
    })

    if (collectionPosition === null) throw 'Collection not found!'
    return collections[collectionPosition]
}

const searchCollection = name => new Promise( async (resolve, reject) => {

    try {
        const result = await unsplash.search.getCollections({ query: name, page: 1, perPage: 5 })

        if (result.errors) reject(result.errors[0])

        const collection = getBigCollection(result.response.results)
        
        resolve(collection);

    } catch (e) {
        reject(e)
    }
})


module.exports = {
    searchCollection
}