const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(`UNCAUGHT EXCEPTION! Shutting down ...`);
    console.log(err.name, err.message);
    process.exit(1);
});


dotenv.config({
    path: './config.env'
});

const app = require('./app');

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
// .catch(err => {
//     console.error('Database connection error:', err);
//     process.exit(1);
// });


// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log(`UNHANDLED REJECTION! Shutting down ...`);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});

// console.log(x);



