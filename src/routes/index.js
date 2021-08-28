const { getAllLeaveRequest, requestLeave, respondLeave } = require('../controllers/leaveController')
const User = require('../models/user')
const {ObjectId} = require('mongoose').Types

const isAdmin = (userId) =>{
    return new Promise((resolve, reject) => {
        User.findOne({_id:ObjectId(userId)}).then((userData) => {
            console.log(userData)
            if(userData.role == 2 ){
                console.log('ADMIN authenticated')
                resolve()
            }else{
                reject()
            }
        })
    })
    
}

const routes = [
    {
        method:'GET',
        url:'/api/leave/:id',
        handler:getAllLeaveRequest
    },
    {
        method:'POST',
        url:'/api/leave',
        handler:requestLeave
    },
    {
        method:'PUT',
        url:'/api/leave',
        preHandler:async(request, reply, done) => {
            const userId = request.body.userId // TODO: needs to get from session or token
            console.log("userid",userId);
            isAdmin(userId)
            .then(()=> done())
            .catch(()=>reply.send({message: 'Not authorized'}))
            
          },
        handler:respondLeave
    }
]

module.exports = routes