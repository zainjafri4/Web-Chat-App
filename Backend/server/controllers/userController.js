const User = require("../models/usersModels")
const bcrypt = require('bcryptjs')
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtKey = process.env.JWT
    return jwt.sign({ _id }, jwtKey, { expiresIn: "5d" })
}

module.exports.userCreate = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email });

        if (user) return res.status(400).json("Given Email Already Exists");
        if (!name || !email || !password) return res.status(400).json("All fields are required");

        if (!validator.isEmail(email)) return res.status(400).json("Email Incorrect")
        // if (!validator.isStrongPassword(password)) return res.status(400).json("Password is Weak")

        user = new User({ name, email, password })

        user.password = await bcrypt.hash(user.password, 10)

        await user.save()

        const token = await createToken(user._id)

        res.status(200).json({ _id: user._id, name, email, token})
    } catch(err) {
        console.log(err)
        res.status(500).json({error : err})
    }

}

module.exports.userLogin = async (req, res)=>{
    const {email, password} = req.body;

    try{

        let user = await User.findOne({ email });
        if(!user) return res.status(400).json("Invalid email or password")

        const isValidPass = await bcrypt.compare(password, user.password)

        if (!isValidPass) return res.status(400).json("Invalid email or password")

        const token = await createToken(user._id)

        res.status(200).json({ _id: user._id, name: user.name, email, token})

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports.userFind = async(req, res)=>{
    const userId = req.params.userId

    try{
        const user = await User.findById(userId)
        res.status(200).json(user);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports.userFindAll = async(req, res)=>{
    try{
        const users = await User.find();

        res.status(200).json(users);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}