const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let cars = [
    {id: 1, brand:"Toyota", model: "Corolla", year: 2020, color: "Red"},
    { id: 2, brand: "Ford", model: "Mustang", year: 2021, color: "Blue" },
    { id: 3, brand: "Honda", model: "Accord", year: 2023, color: "White" }
]

//1.List all cars
app.get('/cars', (req,res) => {
    res.json(cars)
})

//2.POST Add a new car
app.post('/cars', (req,res) => {
    const newCar = req.body;

    const newID = req.body.id;
    const exists = cars.some(cars => cars.id == newID);
    if (exists){
        return res.status(400).json({
            message: `Car with id ${newID} already exists. Please try with a different ID.`
        }) 
    }
    cars.push(newCar);
    res.status(201).json(newCar);
})

//3. DELETE Delete a car by ID
app.delete('/cars/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(cars => cars.id === id)
    
    res.send(`Car with ${id} was deleted,`)
})

//4. GET cars/brand/:brand
app.get('/cars/brand/:brand', (req, res) => {
    const brand = req.params.brand.toLowerCase();
    const result = cars.filter(car => car.brand.toLowerCase() === brand);
    res.json(result);
});

//Patch
app.patch('/cars/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const {color} =req.body;
    const car = cars.find(car => car.id === id);

    car.color = color;

    res.json ({
        message: `Cars with id ${id} has been updated.`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
 
