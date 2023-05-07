const express = require('express')
const path = require('path')
const app = express();


//Niddlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, "temp/index.html"));
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log('sunucu çalışıyor');
})