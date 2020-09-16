/**
 * npm packages
 */
const joi = require('joi');
const express = require('express')
/**
 * Routes
 */
const user = require('./routes/user');
const user1 = require('./routes/user1');

const app = express();
/**
 * Middlewares
 */
app.use(express.json());
app.use('/user', user);              
app.use('/user2', user1);           

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];
//----------------------Get Methods part----------------------
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(d => d.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send('Course not found bcs id is incorrect');
    res.send(course)

})

//----------------------Post Methods part----------------------
app.post('/api/courses', (req, res) => {
    //-----Validation part-(start)-----
    /* if(!req.body.name || req.body.name.length<3){
       res.status(400).send('Name is require and should be minium 3 characters');
     }*/

    /* const {error}=validateCourse(req.body);
    if(error){
    res.status(404).send(result.error.details[0].message);
    return;
    };*/
    const schema = {
        name: joi.string().min(3).required()
    };
    const result = joi.validate(req.body, schema);
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    //------validation part(End)------

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//------------------Put Method----------------
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(d => d.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found bcs id is incorrect');

    // const result=validateCourse(req.body);
    const { error } = validateCourse(req.body);
    //const {error}=validateCourse(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    };
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(course, schema);
}

//-----------------------Delete------------------
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(d => d.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found bcs id is incorrect');

    //--Delete part
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.port || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}...`));

