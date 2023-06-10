const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Change this to the desired port number

app.use(express.json());

app.post('/api/send-request', async (req, res) => {
  try {
    const response = await axios.post('https://etahamad-new-plant-disease-detection.hf.space/run/predict', req.body);
    const responseData = response.data;

    // Store the response data in a database or variable for future retrieval
    // For simplicity, let's just store it in a variable
    // You can replace this with your preferred storage solution (e.g., database)
    app.locals.responseData = responseData;

    res.json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/get-response', (req, res) => {
  // Retrieve the stored response data
  const responseData = app.locals.responseData;
  if (!responseData) {
    res.status(404).json({ error: 'No response data available' });
  } else {
    res.json(responseData);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
