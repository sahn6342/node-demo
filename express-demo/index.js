const express = require('express');
const app = express();
const Joi=require('joi');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
]
app.get('/', (req, res) => {
    console.log("Hello");
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.post('/api/pos', (req, res) => {
    const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    // console.log(result)
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id',(req,res)=>{

});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at: ${port}`);
});