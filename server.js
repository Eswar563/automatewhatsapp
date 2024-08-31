const express = require('express');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', messageRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
