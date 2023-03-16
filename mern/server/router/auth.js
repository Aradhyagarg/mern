const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/conn');

const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Pls Fill All The Data" });
    }
    try {

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "User is already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password not match" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            //YAHA PER HASH TAKI DEKHE NA DATA PRESAVE METHOD
            await user.save();
            res.status(201).json({ error: "User is suceess register" });
        }


    } catch (err) {
        console.log(err.message);
        return res.status(500)
    }

});
//login
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Pls Fill All The Data" });
        }

        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
        
        if (!isMatch) {
            res.status(400).json({ err: "wrong cred" });
        } else {
            res.json({ message: "user sign in success" });
        }
        }else{
            res.status(400).json({ err: "user sign in err" });
        }
        
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;

//console.log(req.body);
    //res.json({message: "yome"});
//using Promise
/*router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword ){
        return res.status(422).json({error: "Pls Fill All The Data"});
    }

    User.findOne({ email:email })
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({ error: "User is already exists" });
        }

        const user = new User ({ name, email, phone, work, password, cpassword });

        user.save().then(() => {
            res.status(201).json({message: 'User is register successfully'});
        }).catch((err) =>
            res.status(500).json({error: "Failed to register"}));
    }).catch((err) => {console.log(err);});

});*/
// in async there is no catch part



/*if (!userLogin) {
    res.status(400).json({ err: "user sign in err" });
} else {
    res.json({ message: "user sign in success" });
}*/