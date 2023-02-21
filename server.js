const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 

// Find all
app.get('/restaurant', async (req, res) => {

    // finds and responds with all the entries in the db.
    const restaurantsAll = await Restaurant.findAll();
    res.send(restaurantsAll);

});
  
// Find by ID with error handling
app.get('/restaurant/:id', async (req, res) => {

    try {
        // Find restaurant by using the id parameter in the findByPK())
        const restaurantID = await Restaurant.findByPk(req.params.id);

        // If the restaurant not found throw an error with message 'No restuarant found'
        if (!restaurantID) {
            throw new Error('No restuarant found');
        } 
        
        // if the restaurant found then response sent with entry from the db. 
        res.json(restaurantID);
    
    } catch (error) {
        // catches the error and returns the status code and the message
        res.status(404).send({ error: error.message });
    }
});

app.listen(port, async () => {
    await sequelize.sync();
    console.log('Your server is listening on port ' + port);
    console.log(`server localhost:${port}/restaurant/1`); //this can be deleted
})