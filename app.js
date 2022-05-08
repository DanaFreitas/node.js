




const express = require("express"); //require express
const app = express(); //calls express function
const ejs = require("ejs"); //import ejs
const bodyParser = require("body-parser");
const validateMiddleware = require("./views/middleware/validationMiddleware");
const fileUpload = require("express-fileupload");  //allows images to be uploaded
const mongoose = require("mongoose"); //require mongoose


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./views/middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./views/middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

app.set("view engine", "ejs"); //tell ap to use ejs
global.loggedIn = null; //default value for being logged in. global variable
app.use(express.static("public")); //allows express to use public files like html and css
app.use(fileUpload())




app.use(expressSession({secret: 'keyboard cat'})) //make cookies

app.use("*",(req,res,next)=>{ //all requests must go through middleware
  loggedIn = req.session.userId
  next()
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//mongoose.connect("mongodb://localhost/final_database", {useNewUrlParser: true,});
mongoose.connect('mongodb+srv://DanaFreitasFinal:kJTXtFoVd6nff9rB@cluster1.whvir.mongodb.net/final_database?retryWrites=true&w=majority', {useNewUrlParser: true,});

//connect mongoose to a database


let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})


//app.listen(3000, () => {
  //link to localhost
 // console.log("App listening on port 3000");
//});


app.get("/index.ejs", (req, res) => {
  res.render("index");
});


app.get('/posts/new',authMiddleware, newPostController)
app.get('/',homeController)
app.post('/form/store',authMiddleware, storePostController)
app.get('/form',getPostController)
app.get('/newuser',redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/login',redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));



  app.get('/',async(req, res) =>{const issues = await Issue.find({})
res.render('index', {issues});})

  

app.get("/login", (req, res) => { 
  res.render("login");
});
app.get("/newuser", (req, res) => { 
  res.render("newuser");
});

app.post("/form", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/assets/images", image.name), 
  async (error) => {
  await Issue.create({
    ...req.body,
    image: "assets/images/" + image.name, });
  
  res.redirect("/");
  });
  });
  

