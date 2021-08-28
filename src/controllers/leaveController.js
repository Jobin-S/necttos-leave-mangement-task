
const Leave = require('../models/leave')
const User = require('../models/user')

exports.getAllLeaveRequest =async (req, reply)=>{
    const userId = req.params.id
    try {
        Leave.find({requestedBy: userId})
        .then((doc)=> {
            return reply.send(doc)
        })
    } catch (err) {
        return reply.send({error: 'Something went wrong'})
    }
}

exports.requestLeave =async (req, reply)=>{
    // TODO: needs to take userId from session or token
    const {userId, requestedDateTime} = req.body
    try {
        if(!userId)return reply.send({status:false, message:'userId is required', errField: 'userId'})
        if(typeof(requestedDateTime) === Date) return reply.send({status:false, message:'requestedDateTime must be a Date', errField: 'requestedDateTime'})

        const newLeave = new Leave({
            requestedDateTime,requestedBy:userId
        })

        newLeave.save().then((doc)=> {
            return reply.send({status:true, message:'Leave was successfully created', leave:doc})
        }).catch((err)=> {
            return reply.send({status:false, message:'Unable to create leave'})
        })
    } catch (err) {
        return {error: 'Something went wrong'}
    }
}

exports.respondLeave =async (req, reply)=>{
    const {status, leaveId} = req.body
    try {
        if(status !== 'reject' && status !== 'accept'){
            return reply.send({status: false, message:'unknown status'})
        }

        Leave.updateOne({_id: leaveId}, {
            $set:{
                status:status
            }
        }).then(()=>{
            return reply.send({status:true})
        }).catch((err)=>{
            return reply.send({status:false, message:'could not update leave'})
        })
    } catch (err) {
        return {error: 'Something went wrong'}
    }
}