const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

var oracle = require('oracledb');
var dbConfig = require('../db/oracleConfig');
oracle.autoCommit = true; // 자동커밋
oracle.outFormat = oracle.OBJECT; //데이터 주고받는 형식 : 객체

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : 'id', //req.body의 데이터값
        passwordField : 'pw'
    }, (id, pw, done)=>{
        oracle.getConnection(dbConfig,(err,conn)=>{
            if(err) {
                console.log('DB접근 실패');
                console.error(err);
            } else {

                conn.execute(`SELECT * FROM tbl_user WHERE user_id = '${id}'`,
                async (err, result)=>{
                    if(err) {
                        console.error(err);
                    } else {

                        if(result.rows.length != 0) { //해당 아이디를 찾았을 경우
                            var exUser = result.rows[0];
                            const pwCheck = await bcrypt.compare(pw, exUser.USER_PWD);
                            if(pwCheck) {
                                done(null, exUser);
                                conn.close();
                            } else {
                                done(null, false, {msg : "비밀번호가 일치하지 않습니다."});
                                conn.close();
                            }

                        } else {
                            done(null, false, {msg : "가입되지 않은 회원입니다."});
                            conn.close();
                        }

                    }
                })

            }
        })
    }));

}