const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected…');
})
.catch(err => {
    console.log('Error connecting to the database', err);
    process.exit(1);
});

app.use(cors());
app.use(express.json()); // for parsing application/json

// Use the routes defined in your routes folder
const routes = require('./routes');
app.use(routes);

app.listen(config.app.port, () => console.log(`Server listening on port ${config.app.port}`));
