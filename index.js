const express = require("express");
const { users, posts, authors } = require("./data");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, // Enable credentials (cookies, headers, etc.)
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/server", async (req, res) => {
  return res.status(200).json(true);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({
      error: "User Not Found",
    });
  }
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    "Vital Signin Token",
    { expiresIn: "24h" }
  );

  return res.cookie("access_token", token).status(200).json({
    user: user,
    token: token,
  });
});

app.get("/profile", async (req, res) => {
  const { id } = req.query;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(401).json({
      error: "User Not Found",
    });
  }
  return res.status(200).json(user);
});

app.get("/authors", async (req, res) => {
  return res.json(authors);
});

app.get("/posts", async (req, res) => {
  const postsWithAuthors = posts.map((post) => {
    const author = authors.find((author) => author.id === post.userId);
    return {
      ...post,
      author: author ? author.name : "Unknown Author",
    };
  });

  return res.json(postsWithAuthors);
});


app.post("/posts", async (req, res) => {
  const _post = { ...req.body };
  _post.id = (
    posts.length > 0 ? +posts[posts.length - 1].id + 1 : 1
  ).toString();
  _post.date = new Date().toISOString();
  posts.push(_post);
  return res.json(_post);
});

app.patch("/posts", async (req, res) => {
  const _post = { ...req.body };
  const index = posts.findIndex((p) => p.id === _post.id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  posts[index] = _post;
  return res.json(_post);
});

app.delete("/posts", async (req, res) => {
  const { id } = req.query;
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  posts.splice(index, 1);
  return res.json(id);
});

app.listen(4000, () => {
  console.log("listening");
});
