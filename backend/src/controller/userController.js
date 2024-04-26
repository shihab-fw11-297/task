const { modelsDB } = require('../config/db');
const bcrypt = require('bcrypt');

const User = modelsDB.user;

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let info = {
            email:email,
            password: hash
        }
        const savedUser = await User.create(info);
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(500).json({message:"internel server error",error:err})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email }});

        console.log(user)
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).send("Password is not correct");
        }

        res.status(200).send("User Login successfully");

    } catch (err) {
        res.status(500).send("Internal server error");
    }
}


module.exports = { register, login }