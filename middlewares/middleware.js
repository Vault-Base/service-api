export const protect = (req,res,next)=>{
    const authKey = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY
    // console.log("ok");
    // console.log(secretKey)
    // console.log(req.headers.authorization)
    if(!authKey) return res.status(400).json({message:"no key found"})
    if(secretKey==authKey){
        next();
    }
    else{
        return res.status(404).json({message:"bad auth"})

    }
    
}