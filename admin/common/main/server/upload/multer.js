var bodyParser = require('body-parser');
var multer = require('multer');
MulterMid = multer({dest: '/upload/tmp'});
Picker.middleware(MulterMid.any());
