var express = require('express');
var router = express.Router();

const passport = require('passport');
const {isNotLogin, isLogin} = require('./middlewares/loginCheck');

var oracle = require('oracledb');
oracle.autoCommit = true; // 자동커밋
oracle.outFormat = oracle.OBJECT; //데이터 주고받는 형식 : 객체


// 로그인
router.post('/login', isNotLogin, (req,res,next)=>{
  passport.authenticate('local', (err, user, info)=>{
    if(err) {
      console.error(err);
      res.send("로그인 에러");
      return next(err);
    }
    if(!user) {
      return res.send(info.msg); // 가입된 회원이 아니거나, 비밀번호가 틀린 경우
    }
    return req.login(user, (err)=>{
      if(err) {
        console.error(err);
        res.send(err);
        return next(err);
      } else {
        return res.send('ok');
      }
    })

  })(req,res,next);
});

// 로그아웃
router.get('/logout', isLogin, (req,res)=>{
  req.logout();
  req.session.destroy();
  res.send('ok');
})

// 로그인 체크
router.get('/loginCheck', (req, res)=>{
  if(req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(null);
  }
})

module.exports = router;
