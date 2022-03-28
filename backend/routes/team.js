var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');


router.post('/inviteUser', async (req, res)=>{
    var alreadyInvite = await db.execute(`SELECT * FROM tbl_schedule
    WHERE user_id = '${req.body.userId}' AND proj_code = ${req.body.pjCode} AND sche_status = 'inviteReq'`);
    if(alreadyInvite.rows.length != 0) { // 이미 해당 유저에 대한 초대가 존재하는 경우
        res.send("already");
    } else {
        var pjTitle = await db.execute(`SELECT proj_title FROM tbl_project WHERE proj_code = ${req.body.pjCode}`);
        console.log(pjTitle);
        pjTitle = pjTitle.rows[0].PROJ_TITLE;

        var currentTime = timestamp.getTimestamp();
        var sendInvite = await db.execute(`INSERT INTO tbl_schedule(proj_code, sche_code, user_id, sche_stdate, sche_content, sche_status)
        VALUES(
            ${req.body.pjCode},
            tbl_schedule_${req.body.pjCode}_seq.NEXTVAL,
            '${req.body.userId}',
            '${currentTime}',
            '${req.user.USER_NICKNAME}님의 프로젝트 [${pjTitle}] 협업 초대장이 도착했어요.',
            'inviteReq'
        )`);
        if(sendInvite == "err") {
            console.log("유저 프로젝트 초대 실패");
            res.send("err");
        } else {
            res.send("ok");
        }
    }
})


module.exports = router;