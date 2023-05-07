import express from "express";
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    const photo = {
        id:1,
        name: "Photo Name",
        description: "Photo desc"
    };
    res.send(photo);
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log('sunucu çalışıyor');
})