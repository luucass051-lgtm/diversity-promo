const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'promotions.json');

app.use(cors());
app.use(bodyParser.json());

// ensure data file exists
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(DATA_FILE)) {
  const sample = Array.from({length:8}).map((_,i)=>({
    id: i+1,
    title: `Promoção ${i+1}`,
    store_name: `Loja ${i%4+1}`,
    price_promotional: (99 - i).toFixed(2),
    images: [`https://via.placeholder.com/800x1200.png?text=Promo+${i+1}`],
    video_url: i%3===0 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : null,
    likes: 0,
    saved_count:0
  }));
  fs.writeFileSync(DATA_FILE, JSON.stringify(sample, null, 2));
}

function readData(){ return JSON.parse(fs.readFileSync(DATA_FILE)); }
function writeData(d){ fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

app.get('/promotions', (req, res) => {
  const data = readData();
  res.json(data);
});

app.get('/promotions/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const item = data.find(p=>p.id===id);
  if (!item) return res.status(404).json({error:'not found'});
  res.json(item);
});

app.post('/promotions', (req, res) => {
  const data = readData();
  const nextId = data.length ? Math.max(...data.map(d=>d.id))+1 : 1;
  const item = Object.assign({id: nextId, likes:0, saved_count:0}, req.body);
  data.unshift(item);
  writeData(data);
  res.status(201).json(item);
});

app.post('/promotions/:id/like', (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const item = data.find(p=>p.id===id);
  if (!item) return res.status(404).json({error:'not found'});
  item.likes = (item.likes || 0) + 1;
  writeData(data);
  res.json({ok:true, likes: item.likes});
});

app.post('/promotions/:id/save', (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const item = data.find(p=>p.id===id);
  if (!item) return res.status(404).json({error:'not found'});
  item.saved_count = (item.saved_count || 0) + 1;
  writeData(data);
  res.json({ok:true, saved: item.saved_count});
});

app.listen(PORT, ()=> console.log(`API running on http://localhost:${PORT}`));
