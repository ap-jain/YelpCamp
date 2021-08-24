const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'))
db.once("open", () => {
    console.log("Database Connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length
)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '61232f83de6d8532cc5bd4c2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            geometry : { type: 'Point', coordinates: [cities[random1000].longitude,cities[random1000].latitude] },
            images: [
                {
                    url: "https://res.cloudinary.com/arpit22/image/upload/v1629713716/YelpCamp/ybfxp81sxavcom1y5ibb.jpg",
                    filename: "YelpCamp/ybfxp81sxavcom1y5ibb"
                },
                {
                    url: "https://res.cloudinary.com/arpit22/image/upload/v1629713716/YelpCamp/jssviihn0ttybpx1gv8p.jpg",
                    filename: "YelpCamp/jssviihn0ttybpx1gv8p"
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam excepturi eligendi sunt obcaecati tenetur consectetur amet asperiores maiores recusandae ratione illum, delectus quam necessitatibus quibusdam similique earum harum quae ullam.',
            price
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})