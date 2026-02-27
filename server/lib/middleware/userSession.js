// Создать сессию вступившого в клуб пользователя
//Поменять кнопку пользователя на главной страници с вступить на магазин

//Middleware for auth cookie
exports.genId = (req, res, next) =>{
    if(!req.signedCookies.user_id){
        const newUserId = Math.random().toString(36).substring(7);
        res.cookie('user_id', newUserId, { signed: true })
    }
    console.log('You are Authorisated')
    console.log(req.signedCookies.user_id)
    next()
}


exports.auth = (req, res, next) => {
    const id = req.session.userId
    console.dir('Пользователь атвторизован:' + id)
    const btnText = id? "Get the merch" :  "Join the Club";
    res.json({ message: btnText, id: id })
    next()
}


