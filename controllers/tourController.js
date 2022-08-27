// const fs = require('fs');
const Tour = require('../models/tourModel');
// const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

{
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

// const checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`);
//     if (req.params.id  * 1 > tours.length) {
//         return res.status(404).json({
//             status:'failed',
//             message: 'Invalid ID'
//         });
//     };
//     next();
// };

}

{
// const checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'Failed',
//             message: 'No name or price'
//         });
//     };
//     next();
// };
}

const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

    next();
};

// const getAllTours = catchAsync(async (req,res, next) => {
  
//     // {
//     //     // console.log(req.query);

//     //     // Build query
//     //     // 1a) Filtering
//     //     // const queryObj = {...req.query};
//     //     // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     //     // excludedFields.forEach(el => {
//     //     //     delete queryObj[el];
//     //     // })
//     //     // // console.log(req.query, queryObj);

//     //     // // 1b) Advanced filtering
//     //     // let queryStr = JSON.stringify(queryObj);
//     //     // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//     //     // // console.log(JSON.parse(queryStr));
    
//     //     // let query = Tour.find(JSON.parse(queryStr));

//     //     // 2) Sorting
//     //     // if (req.query.sort) {
//     //     //     const sortBy = req.query.sort.split(',').join(' ');
//     //     //     // console.log(sortBy);
//     //     //     query = query.sort(sortBy);
//     //     //     // sort('price ratingsAverage')
//     //     // } else {  
//     //     //     query = query.sort('-createdAt');
//     //     // }

//     //     // 3) Field limiting
//     //     // if(req.query.fields) {
//     //     //     const fields = req.query.fields.split(',').join(' ');
//     //     //     console.log(fields);
//     //     //     query = query.select(fields);
//     //     // } else {
//     //     //     query = query.select('-__v');
//     //     // }

//     //     // 4) Pagination
//     //     // const page = (req.query.page * 1) || 1;
//     //     // const limit = (req.query.limit * 1) || 100;
//     //     // const skip = (page - 1) * limit;
    
//     //     // query = query.skip(skip).limit(limit);

//     //     // if (req.query.page) {
//     //     //     const numTours = await Tour.countDocuments();
//     //     //     if (skip >= numTours) {
//     //     //         throw new Error('This page does not exist');
//     //     //     }
//     //     // }

//     // }
    
//     // Execute query
//     const features = new ApiFeatures(Tour, req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();

//     const tours = await features.query;

//     // Send response
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours
//         }
//     });
    
// });

const getAllTours = factory.getAll(Tour);
const getTour = factory.getOne(Tour, { path: 'reviews' });
const createTour = factory.createOne(Tour);
const updateTour = factory.updateOne(Tour);
const deleteTour = factory.deleteOne(Tour);

// const getTour = catchAsync(async (req,res, next) => {
  
//     const tour = await Tour.findById(req.params.id).populate('reviews');
//     // Tour.findOne({_id: req.params.id})
//     if (!tour){
//         return next(new AppError('No tour found with that Id', 404));
//     }

//     res.status(200).json({
//     status: 'success',
//     data: {
//         tour
//     }
// });

//     // const tour = tours.find(el => el.id === id);

//     // res.status(200).json({
//     //     'status': 'success',
//     //     'data': {
//     //         tour
//     //     }
//     // });
// });

// {
//     const createTour = (req,res) => {
//         // console.log(req.body);
    
//         const newId = tours[tours.length - 1].id + 1;
//         const newTour = Object.assign({id: newId}, req.body);
    
//         tours.push(newTour);
    
//         fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//             // if (err) return console.log(err); // this causes the endpoint to load continuously
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     tour: newTour
//                 }
//             });
//         });
    
//     };
// }




// const updateTour = catchAsync(async (req,res, next) => {
   
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!tour){
//         return next(new AppError('No tour found with that Id', 404));
//     }

//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     });    
// });


// const deleteTour = catchAsync(async (req,res, next) => {
   
//     const tour = await Tour.findByIdAndDelete(req.params.id);

//     if (!tour){
//         return next(new AppError('No tour found with that Id', 404));
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     });
// });

const getTourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        { 
            $match: { ratingsAverage : { $gte: 4.5 } }
        },
        {
            $group: {
                // _id: '$ratingsAverage',
                _id: {$toUpper: '$difficulty'},
                numTours: { $sum: 1},
                numRatings: { $sum: '$ratingsQuantity'},
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price'},
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },

            }
        },
        {
            $sort: { avgPrice: 1}
        },
        // {
        //     $match: { _id: { $ne: 'EASY' }}
        // }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });  

});

const getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-21`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });  
        
});

module.exports = {
    getAllTours,
    getTour,
    createTour, 
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
    getMonthlyPlan,
    // checkID,
    // checkBody
};
