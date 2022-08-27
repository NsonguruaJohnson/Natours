const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');

const setTourUserIds = (req, res, next) => {
    // Allow Nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

const createReview = factory.createOne(Review);

// const getAllReview = catchAsync( async (req, res, next) => {
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };

//     const reviews = await Review.find(filter);

//     res.status(200).json({
//         status: 'success',
//         results: reviews.length,
//         data: {
//             reviews
//         }
//     });
// });

const getAllReview = factory.getAll(Review);
const getReview = factory.getOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
    setTourUserIds,
    createReview,
    getAllReview,
    deleteReview,
    updateReview,
    getReview,
}