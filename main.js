require('dotenv').config();
const express = require('express');
const path = require("path");
const router = require("./routes/router");
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey : process.env["OPENAI_API_KEY"],
});
const app = express();

// ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정

// public 폴더를 정적 파일로 설정 
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  