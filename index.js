const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method')); 

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/Public")));

app.use(express.urlencoded({extended : true}));

app.listen(port, () => {
    console.log("Listening on port", port);
});



let posts = [{
    username: "khushwant",
    content: "I'm a MERN Stack Developer",
    id: uuidv4()
},
{
    username: "rohit",
    content: "I teach Calculus at Uni",
    id: uuidv4()
},
{
    username: "shradha",
    content: "I'm a software dev",
    id: uuidv4()
}]

app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
}); // home page/ feed

app.get("/posts/new", (req,res) => {
    res.render("create.ejs");
}); // go to create new post page

app.post("/posts", (req,res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({username , content , id});
    res.redirect("/posts"); //redirecting to Feed
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("update.ejs" , { post });
}); // Go to Edit page

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("post.ejs", { post });
}); // go to individual post using "see more"  

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
}); // Deleting post, by changing array element to only those elements who don't have the id of the post to be deleted