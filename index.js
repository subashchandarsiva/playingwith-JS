const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres =[
    {  id:1,genre:"Action"},
    {  id:2,genre:"Sad"},
    {  id:3,genre:"Thriller"},
]

app.get('/',(req,res)=>{
    res.send(genres);
})

app.get('/quest',(req,res)=>{

    const que = parseInt(req.query.id1);
    const que2 = parseInt(req.query.id2);

    const result = (que+que2);
    
//const gen = genres.find(genre=>genre.id===parseInt(que));

//res.send(gen);
res.send(String(result));
console.log(typeof result);
})

app.get('/:id',(req,res)=>{
    const val = req.params.id;
   const g = genres.find(genre=>genre.id===parseInt(val));
   res.send(g);
})


app.post('/',(req,res)=>{
    
    const rest = validateGenres(req.body); 
    if (rest.error) return res.status(400).send(rest.error.details[0].message);

    const gen ={
        id:genres.length+1,
        genre:req.body.genre
    }

    genres.push(gen);
    res.send(gen);
})

app.put('/:id',(req,res)=>{
    const val = req.params.id;
    const g = genres.find(genre=>genre.id===parseInt(val));

    const { error } = validateGenres(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    g.genre=req.body.genre;
    res.send(genres);
})

app.delete('/:id',(req,res)=>{
    const val = req.params.id;
    const g = genres.find(genre=>genre.id===parseInt(val));

    const i = genres.indexOf(g);
    genres.splice(i,1);
    res.send(genres);
})

app.listen(3000,()=>{
    console.log("listening in 3000")
})


const validateGenres=(genre)=>{

    const schema ={
        genre: Joi.string().min(3).required()

    };

    return Joi.validate(genre,schema);
}
