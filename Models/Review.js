const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
attraction: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    },
    visitor: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required:true
    },
    score: {
        type: Number,                     // Defines the field type as a number
        required: [true, 'Score is required'], // Ensures the field is mandatory with a custom error message
        min: [1, 'Score must be at least 1'],  // Sets the minimum value to 1
        max: [5, 'Score cannot exceed 5'],     // Sets the maximum value to 5
    },
    comment:
    {
        type:String
    }

});

module.exports=mongoose.model('Review',reviewSchema);
