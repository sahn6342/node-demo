function authentication(req,res,next){
    console.log("authenticating");
    next();
}
module.exports=authentication;