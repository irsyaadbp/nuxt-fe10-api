import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());

app.get("/get-error-cors", (req, res) => {
  console.log(req.headers);
  res
    .json({
      userId: 1,
      name: "Budi",
      from: "error cors",
    })
    .end();
});

app.get("/get-solve-cors", cors(), (_req, res) => {
  res
    .json({
      userId: 1,
      name: "Budi",
      from: "solve cors",
    })
    .end();
});

app.get("/cookies", cors(), (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies).end();
});

app.post("/login", cors(), (req, res) => {
  //   console.log(req.cookies);

  if (!req.body?.name) {
    res.status(422);
  }

  const randomNumber = Math.random().toString();
  res.cookie("x-user-token", randomNumber, {
    maxAge: 900000,
    // httpOnly: true,
    domain: "demo.localhost",
    sameSite: "strict",
  });
  res
    .json({
      userId: 1,
      name: req.body.name || "",
      from: "login with cookies",
    })
    .end();
});

app.post("/logout", cors(), (req, res) => {
  //   console.log(req.cookies);

  res.clearCookie("x-user-token");
  res
    .json({
      userId: 1,
      from: "logout",
    })
    .end();
});

app.post("/login/http-only", cors(), (req, res) => {
  //   console.log(req.cookies);

  if (!req.body?.name) {
    res.status(422);
  }

  const randomNumber = Math.random().toString();
  res.cookie("x-user-token-http-only", randomNumber, {
    maxAge: 900000,
    httpOnly: true,
    domain: "localhost",
    sameSite: "strict",
  });
  res
    .json({
      userId: 1,
      name: req.body.name || "",
      from: "login with cookies http only",
    })
    .end();
});

app.post("/logout/http-only", cors(), (req, res) => {
  //   console.log(req.cookies);

  res.clearCookie("x-user-token-http-only");
  res
    .json({
      userId: 1,
      from: "logout",
    })
    .end();
});

app.listen(4000, () => {
  console.log(`Express api is running in port 4000`);
});
