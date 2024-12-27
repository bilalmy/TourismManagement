const express=require('express');
const app=express();
app.use(express.json());
const port=3000;
app.use(express.urlencoded({ extended: true }));
const db=require('../connectmongodb/db');
db;
const attraction=require('../Routes/attractionRoute');
const visitior=require('../Routes/VisitorRoute');
const review=require('../Routes/reviewRoute');

app.use('/api/attraction',attraction);
app.use('/api/visitor',visitior);
app.use('/api/reviews',review);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })