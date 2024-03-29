var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

var storage = require('../aws/aws'); //서버 스토리지



//tbl_novel 검사
router.post('/findPjStore', async (req, res)=>{
    var result = await db.execute(`SELECT * FROM tbl_novel WHERE proj_code = ${req.body.pjCode}`);
    if(result.rows.length == 0) {
        var title = await db.execute(`SELECT proj_title, proj_synopsis FROM tbl_project WHERE proj_code = ${req.body.pjCode}`);
        res.send({msg : "notExist", novelTitle : title.rows[0].PROJ_TITLE, novelSynopsis : title.rows[0].PROJ_SYNOPSIS});
    } else {
        res.send({msg : "exist"});
    }
})

// 새로운 novel 등록
router.post('/addNewNovel', async (req, res)=>{
    var newTime = timestamp.getTimestamp();
    var result = await db.execute(`INSERT INTO tbl_novel VALUES(
        tbl_novel_seq.NEXTVAL, ${req.body.pjCode}, ${req.body.genre}, '${req.body.novelTitle}', '${req.body.novelSynopsis}',
        200, null, null, 'testTEAM', null, 'D', null, 0, 0, null, '${newTime}'
    )`);
    
    if(result == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})

// 최종 갱신일 업데이트
router.post('/releaseDateUp', async (req, res)=>{
    var newTime = timestamp.getTimestamp();
    var result = await db.execute(`UPDATE tbl_novel SET nove_update = '${newTime}' WHERE proj_code = ${req.body.pjCode}`);
    if(result == "err") {
        res.send("err");
    } else {
        res.send("ok");
    }
})


// 새로운 프로젝트 생성
router.post('/createNewPj', async (req, res)=>{
    var newDate = await timestamp.getTimestamp();
    console.log(newDate);

    var insertNewPj = await db.execute(`INSERT INTO tbl_project(proj_code, proj_title, proj_synopsis, proj_entirestake, proj_retouchdate)
    VALUES(tbl_project_seq.NEXTVAL, '${req.body.title}', '${req.body.synopsis}', 0, '${newDate}')`);
    if(insertNewPj == "err") {
        console.log("DB쿼리 실패");
    } else {
        var getThisPjCode = await db.execute(`SELECT proj_code FROM tbl_project WHERE proj_title = '${req.body.title}'`);
        getThisPjCode = getThisPjCode.rows[0].PROJ_CODE;

        // 프로젝트 팀(협업) 설정
        var result = await db.execute(`INSERT INTO tbl_cooperation(user_id, proj_code)
        VALUES('${req.user.USER_ID}', '${getThisPjCode}')`);
        if(result == "err") {
            console.log("DB쿼리 실패");
            res.send("err");
        } else {
            storage.createProjectDir(getThisPjCode); //서버 스토리지에 해당 프로젝트 리소스 폴더 생성
            console.log(`다음의 유저가 새로운 프로젝트를 생성함 : ${req.user.USER_ID}\n프로젝트 코드 : ${getThisPjCode}\n이름 : ${req.body.title}`);
            res.send({pjCode : getThisPjCode});
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
            var findPj = await db.execute(`SELECT proj_code, proj_retouchdate, proj_title, proj_status, 0 as proj_cooperation FROM tbl_project WHERE proj_code = ${pjCode[i].PROJ_CODE}`);
            findPj = findPj.rows;
            console.log(findPj)
            if(findPj[0]!=undefined){
                let findCoop = await db.execute(`select count(proj_code) as member from tbl_cooperation group by proj_code having proj_code = ${findPj[0].PROJ_CODE}`)
                findCoop = findCoop.rows
                console.log(findCoop)
                findPj[0].PROJ_COOPERATION = (findCoop[0].MEMBER>=2?'Y':'N')
                pjList.push(findPj[0]);
            }
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

//프로젝트 정보수정
router.patch('/editPjInfo', async (req,res)=>{
    console.log("다음 프로젝트 정보를 수정함 : " + req.body.pjCode);
    var newDate = await timestamp.getTimestamp();

    var result = await db.execute(`UPDATE tbl_project SET
    proj_status = '${req.body.status}', proj_title = '${req.body.title}', proj_synopsis = '${req.body.synopsis}', proj_retouchdate = '${newDate}'
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

    // var dropChangeSeq = await db.execute(`DROP SEQUENCE tbl_change_${req.body.pjCode}_seq`);
    // if(dropChangeSeq == "err") {
    //     console.log("해당 프로젝트에 대한 변경점 시퀀스 삭제 실패");
    // }
    // var dropScheSeq = await db.execute(`DROP SEQUENCE tbl_schedule_${req.body.pjCode}_seq`);
    // if(dropScheSeq == "err") {
    //     console.log("해당 프로젝트에 대한 스케쥴 시퀀스 삭제 실패");
    // }

    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send("err");
    } else {
        await storage.deleteProjectDir(req.body.pjCode); // 서버스토리지에서 해당 프로젝트 폴더 삭제
        res.send("ok");
    }
})
router.post('/epUp', async (req, res)=>{
    var returnEp = await db.execute(`SELECT proj_nextep FROM tbl_project WHERE proj_code = ${req.body.pjCode}`)
    var epValue = await db.execute(`UPDATE tbl_project SET proj_nextep = proj_nextep+1 WHERE proj_code = ${req.body.pjCode}`)
    console.log(epValue)
    res.send(returnEp)
})



module.exports = router;