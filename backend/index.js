const { getCollection } = require('./unsplash/collection')
const { getPhotos } = require('./unsplash/explore')

const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:8080'
}))

app.get('/collections/', async (req, res) => {
    
    if (typeof req.query.slug === 'undefined') return res.status(400).send('Bad request')

    try {
        const collection = await getCollection(req.query.slug)
        res.status(200).send(collection)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.get('/explore/', async (req, res) => {
    
    if (typeof req.query.page === 'undefined') return res.status(400).send('Bad request')

    try {
        const photos = await getPhotos(parseInt(req.query.page))
        res.status(200).send(photos)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.listen(port, () => console.log(`App is running on http://localhost:${port}`))