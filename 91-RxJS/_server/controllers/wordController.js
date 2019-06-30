const BASE_URL = require('../config').BASE_URL;


const data = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy",  "dog"];
console.log(`Word Controller: To get the first word, go to ${BASE_URL}/word/0`);


exports.getWord = async (req, res) => {

  const index = req.param("index");

  setTimeout(function() {
    res.status(200).send(data[index]);
  }, Math.random() * 3000);
};
