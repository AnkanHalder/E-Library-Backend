const fs = require('fs');
const axios = require('axios');

// Read the data from the text file
fs.readFile('./file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Convert the data into a JSON object
  const bookData = {};
  data.split('\n').forEach(line => {
    const [key, value] = line.split(': ');
    if (key && value) {
      bookData[key.trim()] = value.trim();
    }
  });

  // Construct the mongoose schema object
  const bookSchema = {
    author: bookData['Author'],
    description: bookData['Description'],
    genre: bookData['Genre'],
    Link: bookData['Cover Link'],
    count: parseInt(bookData['Count']),
    Borrow: [],
    name: bookData['Name'],
  };

  // Make a POST request to the localhost:8000/postVideo endpoint
  axios.post('http://localhost:8000/postBook', bookSchema)
    .then(response => {
      console.log('Data posted successfully!',response.data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
});
