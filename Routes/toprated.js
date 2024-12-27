const express = require('express');
const router = express.Router();
const Attraction = require('../Models/Attraction');
const Review = require('../Models/Review');

// Endpoint to get the top 5 attractions by rating
router.get('/toprated', async (req, res) => {
    try {
        // Get all attractions
        const attractions = await Attraction.find();

        // Array to store attraction ratings
        const attractionRatings = [];

        // For each attraction, calculate the average rating
        for (let attraction of attractions) {
            const reviewsForAttraction = await Review.find({ attraction: attraction._id });
            if (reviewsForAttraction.length > 0) {
                const totalScore = reviewsForAttraction.reduce((acc, review) => acc + review.score, 0);
                const averageRating = totalScore / reviewsForAttraction.length;

                // Push attraction with its rating
                attractionRatings.push({
                    attractionId: attraction._id,
                    name: attraction.name,
                    location: attraction.location,
                    entranceFee: attraction.entranceFee,
                    rating: averageRating,
                });
            } else {
                // If no reviews, assign 0 rating
                attractionRatings.push({
                    attractionId: attraction._id,
                    name: attraction.name,
                    location: attraction.location,
                    entranceFee: attraction.entranceFee,
                    rating: 0,
                });
            }
        }

        // Sort attractions by rating in descending order and get top 5
        const topAttractions = attractionRatings.sort((a, b) => b.rating - a.rating).slice(0, 5);

        // Return top 5 attractions
        res.status(200).json(topAttractions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
