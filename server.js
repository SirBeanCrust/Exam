import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;
const DATA_FILE = './inventory_data_with_categories.json';

app.use(cors());
app.use(bodyParser.json());

app.get('/items', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.send(JSON.parse(data));
    } catch (err) {
        res.status(500).send('Error reading data');
    }
});

app.post('/update-item', async (req, res) => {
    const updatedItem = req.body;

    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const items = JSON.parse(data);
        const itemIndex = items.findIndex(item => item.Beskrivelse === updatedItem.Beskrivelse);

        if (itemIndex !== -1) {
            items[itemIndex] = updatedItem;

            await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 4));
            res.send('Item updated successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        res.status(500).send('Error updating data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});