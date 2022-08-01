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
    var getList = await db.execute(`SELECT * FROM tbl_schedule s, tbl_schedule_notice n WHERE s.sche_code = n.sche_code`);
    if(getList == "err") {
        res.send('err');
    } else {
        res.send(getList.rows);
    }
})

router.post('/readSchedule', async (req, res)=>{
    var readSchedule = await db.execute(`UPDATE tbl_schedule_notice SET snot_isread = 1
        WHERE user_id = '${req.user.USER_ID}'
        AND sche_code = ${req.body.scheCode}`);

    if(readSchedule == "err") {
        res.send("err")
    } else {
        res.send("ok");
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
    var refuseInvite = await db.execute(`DELETE FROM tbl_schedule
    WHERE user_id = '${req.user.USER_ID}' AND proj_code = ${req.body.pjCode} AND sche_type = 'I' AND sche_code = ${req.body.scheCode}`);
    if(refuseInvite == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})

//현 프로젝트에 참여중인 멤버 목록
router.post('/memberList', async (req, res)=>{
    var memberList = await db.execute(`SELECT user_id, (SELECT user_nickname FROM tbl_user WHERE tbl_user.user_id = tbl_cooperation.user_id) as user_nickname, proj_code, coop_stake FROM tbl_cooperation
    WHERE proj_code=${req.body.pjCode}`);
    console.log(memberList)
    if(memberList == "err") {
        res.send("err");
    } else {
        let list = [];
        await memberList.rows.forEach(async (item)=>{
            if(item.USER_ID == `${req.user.USER_ID}`) {
                list.unshift(item);
            } else {
                list.push(item)
            }
        })
        res.send(list);
    }
})

router.post('/scheduleList', async (req, res)=>{
    var scheduleList = await db.execute(`SELECT * FROM tbl_schedule WHERE proj_code = ${req.body.pjCode} AND sche_type = 'S' ORDER BY sche_stdate`)
    if(scheduleList == "err"){
        res.send("err")
    }
    else{
        res.send(scheduleList.rows)
    }
})

router.post('/uploadMemberList', async (req, res)=>{
    for(let i=0;i<req.body.list.length;i++){
        var update = await db.execute(`UPDATE tbl_cooperation SET coop_stake = ${req.body.list[i].COOP_STAKE} WHERE user_id = '${req.body.list[i].USER_ID}' AND proj_code = '${req.body.list[i].PROJ_CODE}'`)
        if(update == "err"){
            res.send("err")
        }
    }
    res.send("ok")
})

router.post('/addSchedule', async (req, res)=>{
    var sche_code = await db.execute(`select tbl_schedule_seq.nextval from dual`)
    if(sche_code!="err"){
        console.log(`INSERT INTO tbl_schedule(sche_code, proj_code, user_id, sche_type, sche_stdate, sche_eddate, sche_content) VALUES(${sche_code.rows[0].NEXTVAL}, ${req.body.pjCode},'${req.user.USER_ID}','S','${req.body.st}','${req.body.ed}','${req.body.content}')`)
        var addSchedule = await db.execute(`INSERT INTO tbl_schedule(sche_code, proj_code, user_id, sche_type, sche_stdate, sche_eddate, sche_content) VALUES(${sche_code.rows[0].NEXTVAL}, ${req.body.pjCode},'${req.user.USER_ID}','S','${req.body.st}','${req.body.ed}','${req.body.content}')`)
        if(addSchedule == "err"){
            res.send("err")
        }
        else{
            var query = "INSERT ALL "
            for(let i=0;i<req.body.list.length;i++){
                query+=`INTO tbl_schedule_notice(user_id, sche_code) VALUES ('${req.body.list[i]}', ${sche_code.rows[0].NEXTVAL}) `
            }
            query+=" SELECT * FROM dual"
            var result = await db.execute(query)
            if(result == "err"){
                res.send("err")
            }
            else res.send("ok")
        }
    }
})
router.post('/deleteSchedule', async (req, res)=>{
    let query = "DELETE FROM tbl_schedule WHERE sche_code in ("+req.body.list[0]
    for(let i=1; i<req.body.list.length;i++){
        query+=`, ${req.body.list[i]}`
    }
    query+=")"
    let deleteSchedule = await db.execute(query)
    if(deleteSchedule == "err"){
        res.send("err")
    }
    else{
        res.send("ok")
    }
})
module.exports = router;