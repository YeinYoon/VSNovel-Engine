var express = require('express');
var router = express.Router();

var db = require('../database/db');

router.post('/search', async (req, res)=>{
    var type;
    if(req.body.searchType == "I") {
        type = "user_id";
    } else {
        type = "user_nickname";
    }

    console.log(`유저 검색\n유형 : ${type}, 키워드 : ${req.body.searchKeyword}`);

    var userList = await db.execute(`SELECT user_id, user_nickname FROM tbl_user WHERE ${type} LIKE '%${req.body.searchKeyword}%'`);
    userList = userList.rows;

    if(userList.length == 0) {
        res.send("empty");
    } else {
        console.log(userList);
        res.send(userList);
    }
})


module.exports = router;