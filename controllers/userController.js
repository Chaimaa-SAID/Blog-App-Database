const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Routes
function loginpage(req, res) {
    res.send(`
      <h1>Login</h1>
      <form action="/login" method="POST">
        <input type="email" name="email" placeholder="email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>`);
}

function login(req, res) {
    // Extract validated data
    const { email, password } = req.body;
    const user = User.findOne({ email: email });
    console.log(user);
    if (!user){
        return res.status(401).json({ message: 'Authentication failed.'});
    }
    const token = jwt.sign({email }, 'secretkey', { expiresIn: '1h' });
    return res.json({ token })

}

function registerpage(req, res) {
    res.send(`
      <h1>Register</h1>
      <form action="/register" method="POST">
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>`);
}

async function register(req, res) {
    const {email, password}=req.body;
const user= await User.findOne({email})

if (user)
{

return res.send("email already exists")
}
const newUser= new User ({
email,password
})
newUser.save().then((user)=>{
console.log("user added");
res.redirect('/login')
}).catch((err)=>{
res.status(401).send(err.message);

})

}

// Ensure Token Function


module.exports = {
    loginpage,
    login,
    registerpage,
    register
};
