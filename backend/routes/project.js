var express = require('express');
var router = express.Router();

var db = require('../database/db');
var timestamp = require('../database/timestamp');

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

            var insertNewPj = await db.execute(`INSERT INTO tbl_project(proj_type, proj_title, proj_synopsis, proj_entirestake, proj_retouchdate)
            VALUES('${req.body.type}', '${req.body.title}', '${req.body.synopsis}', 0, '${newDate}')`);
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




module.exports = router;