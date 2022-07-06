var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

// 유저 프로젝트 초대
router.post('/inviteUser', async (req, res)=>{
    var alreadyInvite = await db.execute(`SELECT * FROM tbl_schedule
    WHERE user_id = '${req.body.userId}' AND proj_code = ${req.body.pjCode} AND sche_type = 'I'`);
    if(alreadyInvite.rows.length != 0) { // 이미 해당 유저에 대한 초대가 존재하는 경우
        res.send("already");
    } else {
        var pjTitle = await db.execute(`SELECT proj_title FROM tbl_project WHERE proj_code = ${req.body.pjCode}`);
        console.log(pjTitle);
        pjTitle = pjTitle.rows[0].PROJ_TITLE;

        var newTime = timestamp.getTimestamp();
        var sendInvite = await db.execute(`INSERT INTO tbl_schedule(proj_code, sche_code, user_id, sche_type, sche_content, sche_stdate)
        VALUES(
            ${req.body.pjCode},
            tbl_schedule_seq.NEXTVAL,
            '${req.body.userId}',
            'I',
            '${req.user.USER_NICKNAME}님의 프로젝트 [${pjTitle}] 협업 초대장이 도착했어요.',
            '${newTime}'
        )`);

        if(sendInvite == "err") {
            console.log("유저 프로젝트 초대 실패");
            res.send("err");
        } else {

            var findScheCode = await db.execute(`SELECT * FROM tbl_schedule
            WHERE user_id = '${req.body.userId}'
            AND proj_code = '${req.body.pjCode}'
            AND sche_type = 'I'`);
            
            var noticeUpdate = await db.execute(`INSERT INTO tbl_schedule_notice
            VALUES(
                '${req.body.userId}',
                ${findScheCode.rows[0].SCHE_CODE},
                0
            )`)

            if(noticeUpdate == "err") {
                res.send("err");
            } else {
                res.send("ok");
            }
        }
    }
})

// 알림 리스트
router.get('/getNoticeList', async (req, res)=>{
    var getList = await db.execute(`SELECT * FROM tbl_schedule s, tbl_schedule_notice n WHERE s.sche_code = n.sche_code
    AND NOT n.snot_isread = 1`);
    if(getList == "err") {
        res.send('err');
    } else {
        res.send(getList.rows);
    }
})

//프로젝트 초대 수락
router.post('/PjAccept', async (req,res)=>{
    var inputMember = await db.execute(`INSERT INTO tbl_cooperation
    VALUES('${req.user.USER_ID}', ${req.body.pjCode}, 0)`);
    if(inputMember == "err") {
        res.send('err');
    } else {
        var readNotice = await db.execute(`UPDATE tbl_schedule_notice SET snot_isread = 1
        WHERE user_id = '${req.user.USER_ID}'
        AND sche_code = ${req.body.scheCode}`);
        if(readNotice == "err") {
            res.send("err")
        } else {
            res.send("ok");
        }
    }
})

// 프로젝트 초대 거절
router.post('/PjRefuse', async (req,res)=>{
    var readNotice = await db.execute(`UPDATE tbl_schedule_notice SET snot_isread = 1
    WHERE user_id = '${req.user.USER_ID}'
    AND sche_code = ${req.body.scheCode}`);
    if(readNotice == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})

//현 프로젝트에 참여중인 멤버 목록
router.post('/memberList', async (req, res)=>{
    var memberList = await db.execute(`SELECT c.*, u.user_nickname FROM tbl_cooperation c, tbl_user u
    WHERE c.proj_code = ${req.body.pjCode} AND c.user_id = u.user_id`);
    if(memberList == "err") {
        res.send("err");
    } else {
        var list = [];
        memberList.rows.forEach((item)=>{
            if(item.USER_ID == `${req.user.USER_ID}`) {
                list.unshift(item);
            } else {
                list.push(item)
            }
        })
        res.send(list);
    }
})

module.exports = router;