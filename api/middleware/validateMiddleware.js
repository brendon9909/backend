const validateMiddleware = (req, res, next) => {
    try{
        const {username} = req.body

        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)){
            next()
        }else{
            return res.status(403).send({message: 'username is not valid, must end with @gmail.com'})
        }
    }
    catch(error){
        res.status(500).send({error: 'Internal server error', error: error.message})
    }
}

module.exports = validateMiddleware