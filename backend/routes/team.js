var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

// 유저 프로젝트 초대
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

// 알림 리스트
router.get('/getNoticeList', async (req, res)=>{
    var getList = await db.execute(`SELECT * FROM tbl_schedule
    WHERE
    user_id = '${req.user.USER_ID}'
    AND NOT(sche_status = 'read')`);
    if(getList == "err") {
        res.send('err');
    } else {
        res.send(getList.rows);
    }
})

//프로젝트 초대 수락
router.post('/PjAccept', async (req,res)=>{
    var inputMember = await db.execute(`INSERT INTO tbl_cooperation
    VALUES('${req.user.USER_ID}', ${req.body.pjCode}, 1, 'Member', 0)`);
    if(inputMember == "err") {
        res.send('err');
    } else {

        // 프로젝트에 참여하는 인원이 1명(관리자)보다 많을 경우 해당 프로젝트는 개인에서 협업 상태로 변경
        var isTeam = await db.execute(`SELECT COUNT(*) AS result FROM tbl_cooperation WHERE proj_code=${req.body.pjCode}`);
        console.log(`해당 프로젝트에 참여하는 인원 : ${isTeam.rows[0].RESULT}명`);
        if(isTeam.rows[0].RESULT > 1) {
            var team = await db.execute(`UPDATE tbl_project SET proj_cooperation = 'Y' WHERE proj_code=${req.body.pjCode}`);
            if(team == "err") {
                console.log("프로젝트 협업 상태변경 실패");
            }
        }

        var readNotice = await db.execute(`UPDATE tbl_schedule SET sche_status='read'
        WHERE
        proj_code = ${req.body.pjCode}
        AND user_id = '${req.user.USER_ID}'
        AND sche_status = 'inviteReq'`);
        if(readNotice == "err") {
            res.send("err")
        } else {
            res.send("ok");
        }
    }
})

// 프로젝트 초대 거절
router.post('/PjRefuse', async (req,res)=>{
    var refusePj = await db.execute(`UPDATE tbl_schedule SET sche_status='read'
    WHERE
    proj_code = ${req.body.pjCode}
    AND user_id = '${req.user.USER_ID}'
    AND sche_status = 'inviteReq'`);
    if(refusePj == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})

module.exports = router;