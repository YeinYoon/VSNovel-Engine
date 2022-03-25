var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

// 새로운 프로젝트 생성
router.post('/createNewPj', async (req, res)=>{
    var exPj = await db.execute(`SELECT * FROM tbl_project WHERE proj_title = '${req.body.title}'`);
    if(exPj == "err") {
        console.log("DB쿼리 실패");
    } else {
        if(exPj.rows.length != 0) { //동일한 프로젝트 이름이 존재할 경우
            console.log(exPj.rows);
            res.send("이미 존재하는 프로젝트 이름입니다.");
        } else {

            var newDate = await timestamp.getTimestamp();
            console.log(newDate);

            var insertNewPj = await db.execute(`INSERT INTO tbl_project(proj_code, proj_type, proj_title, proj_synopsis, proj_entirestake, proj_retouchdate)
            VALUES(tbl_project_seq.NEXTVAL,'${req.body.type}', '${req.body.title}', '${req.body.synopsis}', 0, '${newDate}')`);
            if(insertNewPj == "err") {
                console.log("DB쿼리 실패");
            } else {
                
                var getThisPjCode = await db.execute(`SELECT proj_code FROM tbl_project WHERE proj_title = '${req.body.title}'`);
                getThisPjCode = getThisPjCode.rows[0].PROJ_CODE;
                
                var result = await db.execute(`INSERT INTO tbl_cooperation(user_id, proj_code, coop_role)
                VALUES('${req.user.USER_ID}', '${getThisPjCode}', 'Admin')`);
                if(result == "err") {
                    console.log("DB쿼리 실패");
                } else {
                    console.log(`다음의 유저가 새로운 프로젝트를 생성함 : ${req.user.USER_ID}\n프로젝트 코드 : ${getThisPjCode}\n이름 : ${req.body.title}`);
                    res.send("ok");
                }

            }

        }

    }
})

//생성한 프로젝트 리스트
router.get('/getList', async (req, res)=>{
    var pjCode = await db.execute(`SELECT proj_code FROM tbl_cooperation WHERE user_id = '${req.user.USER_ID}'`);
    pjCode = pjCode.rows;

    if(pjCode.length == 0) {
        res.send("empty");
    } else {
        var pjList = [];
        for(var i=0; i<pjCode.length; i++) {
            var findPj = await db.execute(`SELECT * FROM tbl_project WHERE proj_code = ${pjCode[i].PROJ_CODE}`);
            pjList.push(findPj.rows[0]);
        }

        pjList.sort(function(a,b) { // 마지막 수정날짜 순으로 정렬
            return new Date(b.PROJ_RETOUCHDATE) - new Date(a.PROJ_RETOUCHDATE)
        })
        console.log(pjList);
        res.send(pjList);
    }
})

// 프로젝트 정보 조회
router.post('/getPjInfo', async (req,res)=>{
    console.log("다음 프로젝트 정보를 불러옴 : " + req.body.pjCode);
    var result = await db.execute(`SELECT * FROM tbl_project WHERE proj_code = ${req.body.pjCode}`);
    console.log(result);
    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send("err");
    } else {
        res.send(result.rows[0]);
    }
})

// 프로젝트 개발내역 저장(마지막 수정시간 업데이트)
router.patch('/devSave', async (req,res)=>{
    console.log("다음 프로젝트 개발상태를 저장함 : " + req.body.pjCode);
    var newDate = await timestamp.getTimestamp();

    var result = await db.execute(`UPDATE tbl_project SET
    proj_retouchdate = '${newDate}'
    WHERE proj_code = ${req.body.pjCode}`);
    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send({msg : "err"});
    } else {
        res.send({msg : "ok", date : newDate});
    }
})

//프로젝트 정보수정 (현재 시놉시스가 CLOB 데이터인 관계로 제외하고 수정)
router.patch('/editPjInfo', async (req,res)=>{
    console.log("다음 프로젝트 정보를 수정함 : " + req.body.pjCode);
    var newDate = await timestamp.getTimestamp();

    var result = await db.execute(`UPDATE tbl_project SET
    proj_status = '${req.body.status}', proj_title = '${req.body.title}', proj_retouchdate = '${newDate}'
    WHERE proj_code = ${req.body.pjCode}`);
    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send("err");
    } else {
        res.send("ok");
    }
})

//프로젝트 삭제
router.post('/deletePj', async (req,res)=>{
    console.log("다음 프로젝트를 삭제함 : " + req.body.pjCode);
    var result = await db.execute(`DELETE tbl_project WHERE proj_code = ${req.body.pjCode}`);
    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send("err");
    } else {
        res.send("ok");
    }
})


module.exports = router;