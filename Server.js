const express = require('express');
const bodyParser = require('body-parser');
const compiler = require('./compiler'); // Assume compiler is a separate module handling compilation

const app = express();
app.use(bodyParser.json());

app.post('/compile', async (req, res) => {
  const { code, language, difficulty } = req.body;

  try {
    const output = await compiler.compile(code, language); // Assume compile function takes code and language and returns output
    // Compare output with expected output hash for the selected question and difficulty level
    // Store expected output hashes somewhere and retrieve them based on the selected question and difficulty level
    // For simplicity, we'll just return the output for now
    res.json({ output });
  } catch (error) {
    console.error('Error compiling code:', error);
    res.status(500).json({ error: 'Failed to compile code' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
