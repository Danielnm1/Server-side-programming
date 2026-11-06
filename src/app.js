import express from 'express';
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
// Step 10: Serve static files from the 'public' folder under the '/public' sub-path
app.use('/public', express.static('public'));
// Step 8:Get endpoint returning JSON cat data
app.get('/api/v1/cats',(req,res)=>{
    const cat = {
        cat_id : 1,
        name:'Frank',
        birthdate: '2021.05.15',
        owner:'Daniel Melke',
        image: 'https://placecats.com/310/240'
    };
    res.json(cat);
});


// Root endpoint test

app.get('/',(req,res)=>{
    res.send('Welcome to my Rest API!');
});

app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});
