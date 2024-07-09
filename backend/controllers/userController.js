const signupUser=async(req,res)=>{
  try{
   const{name,username,email,password}=req.body();
   const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
  }catch(err){
    res.status(500).json({ error: err.message });
	console.log("Error in signupUser: ", err.message);
  }
}
export default signupUser