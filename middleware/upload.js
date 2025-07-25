const multer = require("multer");
const storage = multer.memoryStorage(); // Or use diskStorage
const upload = multer({ storage });

module.exports = upload;
