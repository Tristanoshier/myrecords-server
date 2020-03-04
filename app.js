require('dotenv').config();

//express
const express = require('express');
const app = express();

//controller imports
const recordCollection = require("./controllers/recordcollectioncontroller");
const recordWishlist = require("./controllers/recordwishlistcontroller");
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
app.use('/album/collection', recordCollection);
app.use('/album/wishlist', recordWishlist);


app.listen(process.env.PORT, () => console.log('app is listening on port 3001'));



