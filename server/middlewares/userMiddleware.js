export default function userMiddleware(roles=[]){
    return (req,res,next) =>{
        if(req.user && (roles.length == 0 || roles.includes(req.user.role)))
            next();
         else{
            req.userError = "Unauthorized"
            next();
         }

    }
}


