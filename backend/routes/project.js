var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

// 새로운 프로젝트 생성
router.post('/createNewPj', async (req, res)=>{
    var newDate = await timestamp.getTimestamp();
    console.log(newDate);

    var insertNewPj = await db.execute(`INSERT INTO tbl_project(proj_code, proj_type, proj_title, proj_synopsis, proj_entirestake, proj_retouchdate)
    VALUES(tbl_project_seq.NEXTVAL,'${req.body.type}', '${req.body.title}', '${req.body.synopsis}', 0, '${newDate}')`);
    if(insertNewPj == "err") {
        console.log("DB쿼리 실패");
    } else {
        var getThisPjCode = await db.execute(`SELECT proj_code FROM tbl_project WHERE proj_title = '${req.body.title}'`);
        getThisPjCode = getThisPjCode.rows[0].PROJ_CODE;

        // 프로젝트 플롯 시퀀스 생성
        var createPlotSeq = await db.execute(`CREATE SEQUENCE tbl_plot_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      9999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`)
        if(createPlotSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 플롯 시퀀스 생성 실패`);
        }

        // 프로젝트 페이지 시퀀스 생성
        var createPageSeq = await db.execute(`CREATE SEQUENCE tbl_page_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      99999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`)
        if(createPageSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 페이지 시퀀스 생성 실패`);
        }

        // 프로젝트 텍스트 시퀀스 생성
        var createTextSeq = await db.execute(`CREATE SEQUENCE tbl_text_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      99999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`);
        if(createTextSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 텍스트 시퀀스 생성 실패`);
        }
                
        //프로젝트 리소스 시퀀스 생성
        var createResourceSeq = await db.execute(`CREATE SEQUENCE tbl_resource_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      99999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`);
        if(createResourceSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 리소스 시퀀스 생성 실패`);
        }

        //프로젝트 변경점 시퀀스 생성
        var createChangeSeq = await db.execute(`CREATE SEQUENCE tbl_change_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      9999999999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`);
        if(createChangeSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 변경점 시퀀스 생성 실패`);
        }

        // 프로젝트 스케쥴 시퀀스 생성
        var createScheSeq = await db.execute(`CREATE SEQUENCE tbl_schedule_${getThisPjCode}_seq
        MINVALUE      1
        MAXVALUE      9999999999
        INCREMENT BY  1
        START WITH    1
        NOCACHE
        NOORDER
        NOCYCLE`);
        if(createScheSeq == "err") {
            console.log(`프로젝트 코드 : ${getThisPjCode}에 대한 스케쥴 시퀀스 생성 실패`);
        }

        // 시작 플롯 생성
        var createStartPlot = await db.execute(`INSERT INTO tbl_plot
        VALUES(${getThisPjCode}, -1, 'start_plot')`);
        if(createStartPlot == "err") {
            console.log("시작 플롯 생성 실패");
        }
                
        // 프로젝트 팀(협업) 설정
        var result = await db.execute(`INSERT INTO tbl_cooperation(user_id, proj_code, coop_role)
        VALUES('${req.user.USER_ID}', '${getThisPjCode}', 'Admin')`);
        if(result == "err") {
            console.log("DB쿼리 실패");
        } else {
            console.log(`다음의 유저가 새로운 프로젝트를 생성함 : ${req.user.USER_ID}\n프로젝트 코드 : ${getThisPjCode}\n이름 : ${req.body.title}`);
            res.send("ok");
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

    //시퀀스 삭제
    var dropPlotSeq = await db.execute(`DROP SEQUENCE tbl_plot_${req.body.pjCode}_seq`);
    if(dropPlotSeq == "err") {
        console.log("해당 프로젝트에 대한 플롯 시퀀스 삭제 실패");
    }
    var dropPageSeq = await db.execute(`DROP SEQUENCE tbl_page_${req.body.pjCode}_seq`);
    if(dropPageSeq == "err") {
        console.log("해당 프로젝트에 대한 페이지 시퀀스 삭제 실패");
    }
    var dropTextSeq = await db.execute(`DROP SEQUENCE tbl_text_${req.body.pjCode}_seq`);
    if(dropTextSeq == "err") {
        console.log("해당 프로젝트에 대한 텍스트 시퀀스 삭제 실패");
    }
    var dropResSeq = await db.execute(`DROP SEQUENCE tbl_resource_${req.body.pjCode}_seq`);
    if(dropResSeq == "err") {
        console.log("해당 프로젝트에 대한 리소스 시퀀스 삭제 실패");
    }
    var dropChangeSeq = await db.execute(`DROP SEQUENCE tbl_change_${req.body.pjCode}_seq`);
    if(dropChangeSeq == "err") {
        console.log("해당 프로젝트에 대한 변경점 시퀀스 삭제 실패");
    }
    var dropScheSeq = await db.execute(`DROP SEQUENCE tbl_schedule_${req.body.pjCode}_seq`);
    if(dropScheSeq == "err") {
        console.log("해당 프로젝트에 대한 스케쥴 시퀀스 삭제 실패");
    }


    var result = await db.execute(`DELETE tbl_project WHERE proj_code = ${req.body.pjCode}`);
    if(result == "err") {
        console.log("DB쿼리 실패");
        res.send("err");
    } else {
        res.send("ok");
    }
})


// 플롯 리스트 가져오기
router.post('/getPlotList', async (req, res)=>{
    console.log(`해당 프로젝트의 플롯 목록을 불러옴 : ${req.body.pjCode}`);
    var result = await db.execute(`SELECT * FROM tbl_plot WHERE proj_code = ${req.body.pjCode}`);
    result = result.rows;

    if(result.length == 0) {
        res.send("empty");
    } else {
        res.send(result);
    }
})

// 플롯 생성
router.post('/createPlot', async (req, res)=>{
    console.log(`새로운 플롯을 생성함\n 대상 프로젝트 : ${req.body.pjCode}`);

    if(req.body.title.length == 0) { // 플롯 제목 미입력시

        var result = await db.execute(`INSERT INTO tbl_plot(proj_code, plot_code)
        VALUES(${req.body.pjCode}, tbl_plot_${req.body.pjCode}_seq.NEXTVAL)`);
        if(result == "err") {
            res.send("err");
        } else {
            // 플롯별 최초 페이지 생성 코드 작성 예정
            res.send("ok");
        }

    } else { // 플롯 제목 입력시

        var result2 = await db.execute(`INSERT INTO tbl_plot
        VALUES(${req.body.pjCode}, tbl_plot_${req.body.pjCode}_seq.NEXTVAL, '${req.body.title}')`);
        if(result2 == "err") {
            res.send("err");
        } else {
            // 플롯별 최초 페이지 생성 코드 작성 예정
            res.send("ok");
        }        

    }
    
})


module.exports = router;