const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
         type: String,
        required:true
    }
})

//HASHING THE PASSWORD



userSchema.pre('save', async function(next) {
    console.log("hi");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    //user password is match with database password
    next();
});

const User = mongooose.model('USER', userSchema);

module.exports = User;
