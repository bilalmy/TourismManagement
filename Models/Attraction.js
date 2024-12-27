const mongoose=require('mongoose');
const attractionSchema=new mongoose.Schema({
name:
{
    type:String,
    required:true
},
location:
{
    type:String,
    required:true
},
entryFee :{
    type: Number,
    required: true,
    min: [0], // Replace 0 with your minimum value
},
rating: {
    type: Number,
    default: 0,
    min: [1], // Minimum value
    max: [5]   // Maximum value
}
});

module.exports=mongoose.model('Attraction',attractionSchema);
