var oracle = require('oracledb');
var dbConfig = require('./oracleConfig');
oracle.autoCommit = true; // 자동커밋
oracle.outFormat = oracle.OBJECT; //데이터 주고받는 형식 : 객체

const getConnection = async()=>{
    return await oracle.getConnection(dbConfig);
}

exports.execute = async(sql)=>{
    let conn, rows = null;
    try {
        conn = await getConnection();
        rows = await conn.execute(sql);
    } catch(err) {
        console.error(err);
        return "err";
    } finally {
        if(conn) {
            conn.close();
        }
    }
    return rows;
}