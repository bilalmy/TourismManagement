const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const Review=require('../Models/Review')
const Visitor=require('../Models/Visitor')

router.post('/create', async (req, res) => {
    const { attraction, visitor, score, comment } = req.body;

    try {
        // 1. Check if the visitor exists in the database
        const visitorRecord = await Visitor.findById(visitor);
        if (!visitorRecord) {
            return res.status(400).json({ error: 'Visitor not found' });
        }

        // 2. Check if the visitor has visited the attraction
        if (!visitorRecord.visitedAttractions.includes(attraction)) {
            return res.status(400).json({ error: 'Visitor must visit the attraction before posting a review' });
        }

        // 3. Check if the visitor has already posted a review for this attraction
        const existingReview = await Review.findOne({ attraction, visitor });
        if (existingReview) {
            return res.status(400).json({ error: 'Visitor has already posted a review for this attraction' });
        }

        // 4. If the visitor has visited the attraction and hasn't already posted a review, create a new review
        const newReview = new Review({
            attraction,
            visitor,
            score,
            comment,
        });

        // Save the review to the database
        await newReview.save();

        // 5. Calculate the new average rating for the attraction
        const reviewsForAttraction = await Review.find({ attraction });
        const totalScore = reviewsForAttraction.reduce((acc, review) => acc + review.score, 0);
        const averageRating = totalScore / reviewsForAttraction.length;

        // 6. Update the attraction's rating
        await Attraction.findByIdAndUpdate(attraction, { rating: averageRating });

        // 7. Send the new review as the response
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get',async (req,res)=>
{
    const data=await Review.find();
    if(!data)
    {
        res.status(401).json('No review found');
    }
    res.status(200).json(data);
})

    router.delete('/delete/:id',async (req,res)=>
    {
        const _id=req.params.id;
        const data=await Review.findOneAndDelete(_id);
        if(!data)
        {
            res.status(401).json('No Visitor found');
        }
        res.status(200).json(data);
    })
    
    router.put('/update/:id',async (req,res)=>
        {
            const _id=req.params.id;
            const {attraction,visitor,score,comment}=req.body;
            const data=await Review.findOneAndUpdate(_id,
                {
                    attraction,visitor,score,comment
                },{new:true}
            );
            if(!data)
            {
                res.status(401).json('No review found');
            }
            res.status(200).json(data);
        })

module.exports = router;

