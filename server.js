const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const dbconfig = require('./db')
app.use(cors());
const model = require('./todomodel')
app.get('/', async (req, res) => {
    try {
        const tasks = await model.find({})
        return res.json({ tasks });
    }
    catch (error) {
        return res.status(400).json({ error });

    }
});

app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    const task = new model({ title })
    console.log(title)
    try {
        const user = await task.save()
        res.send(user)
    }
    catch (error) {
        return res.status(400).json({ error });

    }
});
app.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const updatedTask = await model.findByIdAndUpdate(id, { title }, { new: true });
        res.send(updatedTask);
    } catch (error) {
        return res.status(400).json({ error });
    }
});
app.delete('/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedData = await model.findByIdAndDelete(id);
        res.send("Deleted Successfully")
    }
    catch (error) {
        console.log(error)
    }
}
)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Nodemon setup successful"));