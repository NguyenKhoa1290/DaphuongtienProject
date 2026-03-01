const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname)));
app.listen(5069, () => {
	console.log('Server is running at http://localhost:5069');
});
