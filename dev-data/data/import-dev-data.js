const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({
    path: './config.env'
});

// console.log(process.env);
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    autoCreate: true,
    // useCreateIndex: true, //Not working with mongoose 6.x.y
    // useFindAndModify: false,
}).then(conn => {
    // console.log(conn.connections);
    console.log('DB connection successful');
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// Import data into db
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log(`Data successfully loaded`);
        
    } catch (error) {
        console.log(error)
    }

    process.exit();
};

// Delete all data from db
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log(`Data successfully deleted`);
    } catch (error) {
        console.log(error)
    }

    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
// console.log(process.argv);