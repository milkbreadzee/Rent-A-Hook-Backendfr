import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req,res) => {
    const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "user not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match)return res.status(400).json({msg: "wrong password!"});
    req.session.userId = user.uuid;
     //name of the session is the uuid of the user
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});

}

export const Me = async(req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "please login to your account"})
    }
    const user = await Users.findOne({
        
        where:{
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "user not found"});
    res.status(200).json(user)
}

export const Logout = async(req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "couldnt logout"});
        res.status(200).json({msg: "logout succesful"})
    })
}