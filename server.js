const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// avoid the favicon error
app.get("favicon.ico", function(req,res){
	res.status(204);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
