var app = require('./server');
const port = 3000;

app.listen(port, () => console.log(`Collector Server listening on port ${port}!`));