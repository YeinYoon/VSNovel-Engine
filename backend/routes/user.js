var express = require('express');
var router = express.Router();

var db = require('../database/db');


//유저의 튜토리얼 확인 유무 체크
router.get('/tutorialCheck', async (req, res)=>{
    var data = await db.execute(`SELECT user_ehelp FROM tbl_user WHERE user_id = '${req.user.USER_ID}'`);
    if(data == "err") {
        res.send("err");
    } else {
        res.send(data.rows[0]);
    }
})

router.get('/tutorialDisable', async (req, res)=>{
    var data = await db.execute(`UPDATE tbl_user SET user_ehelp = 'Y' WHERE user_id = '${req.user.USER_ID}'`);
    if(data == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})


//유저 검색
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