import bcrypt from "bcryptjs"
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const getUserProfile=async(req,res)=>{
	const{username}=req.params;

	try{
      const user=await User.findOne({username}).select("-password").select("-updatedAt")
	  if(!user) return res.status(400).json({ error: "User not found" });
	  res.status(200).json(user)
	
	}catch(err){
		res.status(500).json({ error: err.message });
		console.log("Error in UpdatingUser: ", err.message);
	}
}
const signupUser=async(req,res)=>{
  try{
   const{name,username,email,password}=req.body;
   const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();
    if(newUser){
      generateTokenAndSetCookie(newUser._id,res)
      res.status(201).json({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        username:newUser.username
      })
    }else {
			res.status(400).json({ error: "Invalid user data" });
		}
  }catch(err){
    res.status(500).json({ error: err.message });
	console.log("Error in signupUser: ", err.message);
  }
}
//Log in user
const loginUser=async(req,res)=>{
  try{
    const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			
		});

  }catch(err){
    res.status(500).json({ error: err.message });
    console.log("Error in loginUser: ", err.message);
  }
}
const logoutUser=(req,res)=>{
  try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in logoutUser: ", err.message);
	}
}
const followUnFollowUser=async(req,res)=>{
	try{
		const{id}=req.params;
		const userToModify=await User.findById(id);
		const currentUser=await User.findById(req.user._id)
		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);
		if(isFollowing){
         //Unfollow user
		 //update current user following array and also uder to modify  followers array
		 await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
		 await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
		 res.status(200).json({ message: "User unfollowed successfully" });

		}else{
          //follow user
		  await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
		  await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
		  res.status(200).json({ message: "User followed successfully" });

		}



	}catch(err){
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
}
const updateUser=async(req,res)=>{
	const { name, email, username, password, bio } = req.body;

	const userId = req.user._id;
	try {
		let user = await User.findById(userId);
		if (!user) return res.status(400).json({ error: "User not found" });
		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });

		
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;

		user = await user.save();

		

		res.status(200).json(user);
	}
	
	catch(err){
		res.status(500).json({ error: err.message });
		console.log("Error in UpdatingUser: ", err.message);
	}
}

export{signupUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile}