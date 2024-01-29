const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

require('dotenv').config();

// express app
const app = express();

// connect to mongodb

  // "mongodb+srv://highshirt:Omolola99@node-tutorial.q3mdn6z.mongodb.net/node-tutorial?retryWrites=true&w=majority";
  const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New blog 2",
    snippet: "About my new blog",
    body: "More about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

  // routes
  app.get("/", (req, res) => {
    res.redirect("/blogs");
  });
  
  app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
  });
  
  // blog routes
 app.use("/blogs", blogRoutes)

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/single-blog", (req, res) => {
  Blog.findById("65b272067423195895095cbd")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});



// app.get("/", (req, res) => {
//   const blogs = [
//     {
//       title: "Yoshi finds eggs",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "Mario finds stars",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "How to defeat bowser",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//   ];
//   res.render("index", { title: "Home", blogs });
// });

// 404 page



// app.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });

// app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// // redirect
// app.get("/about.me", (req, res) => {
//   res.redirect("/about");
// });

// // 404 page

// app.use((req, res) => {
//     res.status(404).sendFile("./views/404.html", { root: __dirname });
//     }
// );
