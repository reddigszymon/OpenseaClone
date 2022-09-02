const express = require("express");
const axios = require("axios");
const port = 4000;
const cors = require("cors");
const app = express();

app.get("/", cors(), async (req, res) => {
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8cdc4749-80b3-4fd7-8076-1a337c193e78"
      );
    } catch (ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      resolve(json);
      res.send(json);
    }
  });
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
