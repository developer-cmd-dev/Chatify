import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        uinque:true,
        lowerCase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        uinque:true,
        lowerCase:true,
        trim:true,
        
    },
    password:{
        type:String,
        require:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    refreshToken:{
        type:String,
        required:true
    }



},{timestamps:true})


userSchema.pre('save',async function (next) {
    if(!this.isModified(this.password)) return next()
    this.password = bcrypt.hash(this.password,10)
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id :this.id,
            username:this.username,
            email:this.email,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}


userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id :this.id,
            username:this.username,
            email:this.email,
            fullname:this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}



export const User = mongoose.model('User',userSchema)