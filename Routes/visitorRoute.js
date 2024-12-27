const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const Visitor=require('../Models/Visitor');
const Attraction = require('../Models/Attraction');

router.post('/register', async (req, res) => {
    const { name, email, visitAttractions } = req.body;


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if the email already exists in the Visitor collection
    const existingVisitor = await Visitor.findOne({ email });

    if (existingVisitor) {
        return res.status(400).json({ error: 'Already exists email' });
    }

    // Create a new visitor record
    const newVisitor = new Visitor({
        name,
        email,
        visitAttractions
    });

    // Save the new visitor to the database
    await newVisitor.save();

    // Send a success response
    res.status(201).json('Registered Successfully!');
});




router.get('/get',async (req,res)=>
{
    const data=await Visitor.find();
    if(!data)
    {
        res.status(401).json('No visitor found');
    }
    res.status(200).json(data);
})


router.get('/get/:id',async (req,res)=>
    {
        const _id=req.params.id;
        const data=await Visitor.findById(_id);
        if(!data)
        {
            res.status(401).json('No Visitor found');
        }
        res.status(200).json(data);
    })

    router.delete('/delete/:id',async (req,res)=>
    {
        const _id=req.params.id;
        const data=await Visitor.findOneAndDelete(_id);
        if(!data)
        {
            res.status(401).json('No Visitor found');
        }
        res.status(200).json(data);
    })
    
    router.put('/update/:id',async (req,res)=>
        {
            const _id=req.params.id;
            const {name,email,visitAttractions}=req.body;
            const data = await Visitor.findOneAndUpdate(
                { _id: _id },  // Correct filter format: {_id: <id>}
                { name, email, visitAttractions },  // The fields to update
                { new: true }  // This ensures the updated document is returned
            );
            
            if(!data)
            {
                res.status(401).json('No visitor found');
            }
            res.status(200).json(data);
        })

module.exports = router;