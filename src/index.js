// server/index.js
require('dotenv').config()
const routes = require('./routes/index')
const cors = require('cors')
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors())
app.use(express.json())


app.use('/api', routes)
app.use('/api', (req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});