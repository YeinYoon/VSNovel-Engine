const passport = require('passport');
const local = require('./localStrategy');

var oracle = require('oracledb');
var dbConfig = require('../db/oracleConfig');
oracle.autoCommit = true; // 자동커밋
oracle.outFormat = oracle.OBJECT; //데이터 주고받는 형식 : 객체

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        done(null, user.USER_ID);
    });

    passport.deserializeUser((id, done)=>{
        oracle.getConnection(dbConfig, (err, conn)=>{
            if(err) {
                console.error(err);
            } else {
                conn.execute(`SELECT * FROM tbl_user WHERE user_id = '${id}'`,
                (err, result)=>{
                    if(err) {
                        done(err);
                        conn.close();
                    } else {
                        var userData = {
                            USER_ID : result.rows[0].USER_ID,
                            USER_EMAIL : result.rows[0].USER_EMAIL,
                            USER_NICKNAME :result.rows[0].USER_NICKNAME
                        }
                        done(null, userData);
                        conn.close();
                    }
                })
            }
        })

    })

    local();
}