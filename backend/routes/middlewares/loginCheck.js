exports.isLogin = (req,res,next)=>{
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.isNotLogin = (req,res,next)=>{
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인된 상태입니다.');
    }
}