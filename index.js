const express = require('express')
const formidable = require('express-formidable')
const db = require('./dbconn')
const adminModel = require('./models/adminModel')
const app = express()

const HOST = 'localhost'
const PORT = 8000

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(formidable())

// Admin Routes
const adminRoutes = require('./Routes/adminRoutes')
app.use('/admin', adminRoutes)

const userRoutes = require("./Routes/userRoutes");
app.use("/user", userRoutes);


// Root route (http://localhost:8000)
app.get('/', (req, res) => {
    res.render("default")   // 👈 root pe default.ejs render hoga
})

// ================= LOGIN =================
app.get('/login', (req, res) => {
    res.render('login', { msg: null })
})

app.post('/login', async (req, res) => {
    try {
        const user = await adminModel.findOne({ emailId: req.fields.mailId })
        console.log("Login check...")

        if (user) {
            if (user.password === req.fields.pwd) {
                return res.redirect("/redirectlogin")
            } else {
                return res.render('login', { msg: 'Invalid Password' })
            }
        } else {
            return res.render('login', { msg: 'Invalid User Id' })
        }
    } catch (error) {
        console.error(error)
        return res.render('login', { msg: 'Something went wrong!' })
    }
})

// ================= SIGNUP =================
app.get('/signup', (req, res) => {
    res.render('signup', { msg: null })
})

// Signup POST route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.fields;
        // 1. Password confirm check
        if (password !== confirmPassword) {
            return res.render('signup', { error: 'Passwords do not match!' });
        }
        // 2. Check if user already exists
        const existingUser = await adminModel.findOne({ emailId: email });
        if (existingUser) {
            return res.render('signup', { error: 'User already exists!' });
        }
        // 3. Map correctly to schema fields
        const newUser = new adminModel({
            adminName: name,   // mapped correctly
            emailId: email,    // mapped correctly
            password: password // same field
        });
        await newUser.save();
        // 4. Success → redirect to login
        return res.redirect('/login');
    } catch (err) {
        console.error("Signup Error:", err);
        return res.render('signup', { error: 'Something went wrong!' });
    }
});


// ================= OTHER ROUTES =================
app.get('/default',(req,res)=>{ res.render("default") })
app.get('/about',(req,res)=>{ res.render("about") })
app.get('/ride',(req,res)=>{ res.render("ride") })
app.get('/drive',(req,res)=>{ res.render("drive") })
app.get('/help',(req,res)=>{ res.render("help") })
app.get('/business',(req,res)=>{ res.render("business") })
app.get('/sustainbility',(req,res)=>{ res.render("sustainbility") })
app.get('/diversity',(req,res)=>{ res.render("diversity") })
app.get('/safety',(req,res)=>{ res.render("safety") })
app.get('/driver-login',(req,res)=>{ res.render("driver-login") })
app.get('/driver-signup',(req,res)=>{ res.render("driver-signup") })
app.get('/career',(req,res)=>{ res.render("career") })
app.get('/privacy',(req,res)=>{ res.render("privacy") })
app.get('/terms',(req,res)=>{ res.render("terms") })
app.get('/accessibility',(req,res)=>{ res.render("accessibility") })
app.get('/redirectlogin',(req,res)=>{ res.render("redirectlogin") })

// Example POST route at root
app.post('/',(req,res)=>{
    res.send("Post Request Handler.....")
})

// Server listen
app.listen(PORT, HOST, (err)=>{
    if(err)
        console.log(err);
    else
        console.log(`Server running at http://${HOST}:${PORT}`);
})
