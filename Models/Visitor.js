const mongoose=require('mongoose');
const visitorSchema=new mongoose.Schema({
name:
{
    type:String,
    required:true
},
email: {
    type: String,
    unique: true, // Ensures the email is unique
    required: [true, 'Email is required'], // Makes the field mandatory
    match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        'Please provide a valid email address'
    ] // Validates email format using a regex
},
visitAttractions: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    },
],

});

module.exports=mongoose.model('Visitor',visitorSchema);
