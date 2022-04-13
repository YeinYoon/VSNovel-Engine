var express = require('express');
var router = express.Router();
// var timestamp = require('../database/timestamp');
// var storage = require('../aws/aws');

// router.post('/upload', (req, res)=>{
//     console.log(req.body.img);
//     var result = storage.upload('/img/testimg', req.body.img);
//     console.log("업로드 요청 결과값" +result); 
//     if(result == "err") {
//         console.log("업로드 에러" + result);
//         res.send("err");
//     } else {
//         console.log("업로드 성공" + result);
//         res.send("ok");
//     }
// })


module.exports = router;