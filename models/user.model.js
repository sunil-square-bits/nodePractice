var mongosse = require("mongoose");
var mongooaseValidator = require("mongoose-unique-validator");

// schema.methods.setPassword = function (password: string) {
//     this.salt = crypto.randomBytes(16).toString('hex')
//     this.hash_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
//   }

//   schema.methods.validPassword = function (password: string): boolean {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
//     return this.hash_password === hash
//   }

var userSchema = new mongosse.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    accessToken: String,
    password: {
      type: String,
      required: true,
    },
    type: String,
  },
  { timestamps: true }
);

userSchema.plugin(mongooaseValidator);

// userSchema.method.toAuthJson = function(){
// console.log("this value",this, "userSchema",userschema)

//     return {

//     }
// }

mongosse.model("User", userSchema);
