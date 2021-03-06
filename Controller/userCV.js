var userDB = require('./../Model/user');
events = require('events');

module.exports.see_user_cv=function(req,res){

    var eventEmitter = new events.EventEmitter();

    userDB.getUserCVandName(eventEmitter);
    eventEmitter.on('selected-cv', function(cvs_names){
        if(req.session.cvs_names != cvs_names){
            req.session.cvs_names = cvs_names
            res.locals.cvs_names = req.session.cvs_names;
        }
        res.redirect('/See_all_cvs');
    })  
    
    eventEmitter.on('not-selected-cv', function(){
        res.json({
            status:false,
            message:'there are some error with query'
        })
    })
}