const express = require('express');
const app = express();
const Joi=require('joi');

app.use(express.json());
const geners = [{
        gener_id : 1,
        gener_name : 'action'
    },
    {
        gener_id : 2,
        gener_name : 'sci-fi'
    },
    {
        gener_id : 3,
        gener_name : 'horrer'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/geners', (req, res) => {
    res.send(geners);
});

app.get('/api/geners/:id', (req, res) => {
    // res.send(geners[req.params.id-1]);
    const gener=geners.find(c=>c.gener_id===parseInt(req.params.id));
    if(!gener) res.status(404).send('The gener wih the given id is not found');
    res.send(gener);
});

app.post('/api/new_gener',(req,res)=>{
    const schema={
        gener_name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    res.send(result.error.details[0].message);
    // if(!req.body.gener_name||req.body.gener_name.length<3){
    //     res.send('Gener Name is mendatory and atleast length of gener name is 3.')
    //     return;
    // }
    const gener={
        gener_id:geners.length+1,
        gener_name:req.body.gener_name
    }
    geners.push(gener);
    res.send(gener);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at ${port}.`);
});