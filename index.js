const crypto = require("node:crypto");
const fs = require("fs");
const dayjs = require("dayjs");
const LocalizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(LocalizedFormat);
const express = require("express");
const app = express();
const { Console } = require("node:console");

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/data", (req, res) => {
  const { pubKey, privKey, seriesString } = req.query; // Extract query parameters
  const series = seriesString.split(","); // Extract into array of series IDs

  if (!pubKey || !privKey || !series) {
    Console.log("Missing required parameters or body");
    return res
      .status(400)
      .json({ error: "Missing required parameters or body" });
  }

  getSeriesArray(series, pubKey, privKey).then((comics) => {
    if (comics.length > 0 && comics[0] != null) {
      res.json(comics);
    } else {
      res.json({ noComics: true });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

async function getComics(id, pubKey, privKey) {
  const ts = dayjs().unix().toString();
  const hash = crypto.hash("md5", ts + privKey + pubKey);

  const resp = await fetch(
    `https://gateway.marvel.com/v1/public/series/${id}/comics?ts=${ts}&apikey=${pubKey}&hash=${hash}`
  ).then((resp) => resp.json());
  if (resp.code !== 200) {
    console.error("Error fetching comics for series: " + id);
    console.error("Error code: " + JSON.stringify(resp));
    return null;
  }
  if (resp.data.count > 0) {
    console.log("Comics found for series: " + id);
    const comic = resp.data.results[0];
    return { id: id, title: comic.title }; // Return ID and title of the comic
  } else {
    console.log("No comics found for series: " + id);
    return null;
  }
}

async function getSeriesArray(series, pubKey, privKey) {
  console.log("Fetching comics for series: " + series.join(", "));

  // Use Promise.all to process all series in parallel
  const comics = await Promise.all(
    series.map(async (s) => {
      const comic = await getComics(s, pubKey, privKey);
      return comic;
    })
  );
  console.log("Comics fetched: " + comics.length);
  // Filter out any null values
  return comics.filter((comic) => comic !== null);
}
