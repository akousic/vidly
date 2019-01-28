module.exports = function(req, res, next){
//401 UnAuthorized
//403 Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access Denied')
    next();
}