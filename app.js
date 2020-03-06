require('dotenv').config();

//express
const express = require('express');
const app = express();

//controller imports
const albumCollection = require("./controllers/albumcollectioncontroller");
const albumWishlist = require("./controllers/albumwishlistcontroller");
const user = require("./controllers/usercontroller");

//db import & sync
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());

//middleware
app.use(require('./middleware/headers'));

//routes
app.use('/user', user);
app.use (require('./middleware/validate-session'));
app.use('/album/collection', albumCollection);
app.use('/album/wishlist', albumWishlist);


app.listen(process.env.PORT, () => console.log('app is listening on port 3001'));



