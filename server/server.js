const express = require("express");
// const path = require("path");

const app = express();

app.use(express.static(`${__dirname}/../src`));

const PORT = 3003;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));