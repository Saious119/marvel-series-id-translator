# Marvel Series ID Translator

A simple REST API for getting series names from your list of series IDs using [Marvel Comic API](https://developer.marvel.com/) (a free developer account is required to use this API).

This intended use of this API is as support for the TRMNL plugin [Marvel Comic Tracker](https://github.com/Saious119/trmnl-marvel-comic-tracker/tree/main)

## Setup For Use

This application has one GET endpoint `/data` that takes 3 inputs

- `pubKey`: Public key from Marvel API dashboard
- `privKey`: Private key from Marvel API dashboard
- `series`: A comma deliminated list of series IDs (ex: 38806,38809,38865)

If you go to a series from this page: https://www.marvel.com/comics/series, the series ID will be in the URL.

Finally run `npm install`, and `node index.js`

## Example Request

```http
http://localhost:3000/data?pubKey=XXXXXXXXXXXX&privKey=XXXXXXXXXXXXXXX&seriesString=38806,38809,38817,38865,39284,42216,34035,38649,39353,42751,42303
```

## Returned Object Example

```JSON
[
	{
		"id": "38806",
		"title": "Ultimate Black Panther (2024) #18"
	},
	{
		"id": "38809",
		"title": "Ultimate Spider-Man (2024) #19"
	},
	{
		"id": "38817",
		"title": "Ultimate X-Men (2024) #17"
	},
	{
		"id": "38865",
		"title": "Ultimates (2024) #14"
	},
	{
		"id": "39284",
		"title": "Deadpool (2024) #15"
	},
	{
		"id": "42216",
		"title": "All-New Venom (2024) #8"
	},
	{
		"id": "34035",
		"title": "Fantastic Four (2022) #33"
	},
	{
		"id": "38649",
		"title": "DOOM (2024) #1"
	},
	{
		"id": "39353",
		"title": "Spider-Gwen: The Ghost-Spider (2024) #15"
	},
	{
		"id": "42751",
		"title": "Deadpool Kills the Marvel Universe One Last Time (2025) #4"
	},
	{
		"id": "42303",
		"title": "Ultimate Wolverine (2025) #7"
	}
]
```
