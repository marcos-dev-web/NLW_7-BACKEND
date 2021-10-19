import express from "express";
import 'dotenv/config';

import router from './routes';

const app = express();

app.use(express.json());

app.use('/v1', router);

app.get("/github", (_, response) =>{
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
})

app.get("/sign/callback", (request, response) => {
  const { code } = request.query;

  return response.status(200).json(code);
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is runnig at ${PORT}`);
});
