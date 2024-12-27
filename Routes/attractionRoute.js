const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const Attraction=require('../Models/Attraction')

router.post('/create',async (req,res)=>
{
    const {name,location,entryFee,rating}=req.body;
    const attraction=new Attraction(
        {
            name,
            location,
            entryFee,
            rating
        }
    );
    await attraction.save();
    res.status(200).json(attraction);
})

router.get('/get',async (req,res)=>
{
    const data=await Attraction.find();
    if(!data)
    {
        res.status(401).json('No attraction found');
    }
    res.status(200).json(data);
})


router.get('/get/:id',async (req,res)=>
    {
        const _id=req.params.id;
        const data=await Attraction.findById(_id);
        if(!data)
        {
            res.status(401).json('No attraction found');
        }
        res.status(200).json(data);
    })

    router.delete('/delete/:id',async (req,res)=>
    {
        const _id=req.params.id;
        const data=await Attraction.findOneAndDelete(_id);
        if(!data)
        {
            res.status(401).json('No attraction found');
        }
        res.status(200).json(data);
    })
    
    router.put('/update/:id',async (req,res)=>
        {
            const _id=req.params.id;
            const {name,location,entryFee,rating}=req.body;
            const data=await Attraction.findByIdAndUpdate(_id,
                {
                    name,location,entryFee,rating
                },{new:true}
            );
            if(!data)
            {
                res.status(401).json('No attraction found');
            }
            res.status(200).json(data);
        })

module.exports = router;