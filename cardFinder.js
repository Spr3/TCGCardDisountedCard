const puppeteer = require('puppeteer');
const fs = require('fs');
const minprice = 5.00;
const minsoldin3months = 500;

// List of URLs to scrape
const urls = [
    "https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=1&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=2&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=3&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=4&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=5&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=6&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=7&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=8&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=9&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo", 
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=10&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=11&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=12&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=13&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=14&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=15&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=16&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=17&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=18&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=19&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=20&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=21&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=22&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=23&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=24&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=25&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=26&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=27&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=28&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=29&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=30&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=31&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=32&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=33&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=34&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=35&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=36&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=37&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=38&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=39&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=40&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=41&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=42&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=43&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=44&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=45&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=46&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=47&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=48&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=49&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=50&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=51&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=52&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=53&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=54&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=55&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=56&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=57&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=58&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=59&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=60&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=61&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=62&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=63&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=64&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=65&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=66&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=67&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=68&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=69&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=70&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=71&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=72&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=73&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=74&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=75&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=76&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=77&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=78&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=79&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=80&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=81&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=82&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=83&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=84&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=85&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=86&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=87&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=88&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=89&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=90&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=91&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=92&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=93&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=94&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=95&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=96&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=97&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=98&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=99&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=100&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=101&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=102&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=103&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=104&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=105&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=106&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=107&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=108&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=109&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=110&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=111&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=112&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=113&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=114&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=115&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=116&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=117&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=118&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=119&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=120&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=121&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=122&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=123&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=124&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=125&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=126&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=127&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=128&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=129&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=130&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=131&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=132&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=133&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=134&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=135&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=136&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=137&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=138&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=139&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=140&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=141&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=142&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=143&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=144&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=145&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=146&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=147&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=148&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=149&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=150&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=151&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=152&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=153&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=154&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=155&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=156&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=157&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=158&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=159&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=160&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=161&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=162&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=163&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=164&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=165&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=166&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=167&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=168&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=169&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=170&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=171&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=172&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=173&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=174&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=175&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=176&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=177&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=178&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=179&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=180&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=181&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=182&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=183&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=184&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=185&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=186&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=187&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=188&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=189&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=190&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=191&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=192&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=193&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=194&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=195&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=196&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=197&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=198&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=199&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
"https://www.tcgplayer.com/search/pokemon/product?productLineName=pokemon&page=200&view=grid&ProductTypeName=Cards&Condition=Near+Mint&inStock=true&Rarity=Ultra+Rare|Rare|Promo",
];


async function initBrowser() {
    console.log("Initializing browser...");
    const browser = await puppeteer.launch({ headless: false });
    return browser;
}

async function getElementValue(page, url) {
    try {
        await page.goto(url, { waitUntil: ["networkidle0", "domcontentloaded"] });

        for (let i = 1; i < 24; i++) {
            await page.$eval('#app > div > div > section.marketplace__content > section > section > section > section > div:nth-child(' + i + ') > div > div > div > div > a > section', elem => elem.click());

            const amountsold = '#app > div > div > section.marketplace__content > section > div.product-details-container > div.product-details__product > section.product-details__price-guide > div > section.price-guide__latest-sales > section > table > tr.sales-data__top-padding > td.sales-data__right-padding > span';
            const element = await page.waitForSelector(amountsold);
            const Soldcount = parseFloat((await element.evaluate(el => el.textContent.trim())).replace(/[^0-9.]/g, ''));

            const cardnameSelector = '#app > div > div > section.marketplace__content > section > div.product-details-container > div.product-details__product > div > h1';
            const cardnameElement = await page.waitForSelector(cardnameSelector);
            const cardname3 = await cardnameElement.evaluate(el => el.textContent.trim());

            wait(3000);
            // Extract the lowest price
            const lowestPriceSelector = '#app > div > div > section.marketplace__content > section > div.product-details-container > div.product-details__product > section.product-details__breakdown > section.product-details__spotlight > div > section.spotlight__listing > span';
            const Price2 = await page.waitForSelector(lowestPriceSelector);
            const GrabThePrice = parseFloat(
                (await Price2.evaluate(el => el.textContent.trim())).replace(/[^0-9.]/g, '') // Allows digits and the decimal point
            );

            if (GrabThePrice > minprice && Soldcount > mcinsoldin3months) {
                const fs = require('fs');

                const textToAdd = "Sold Count:" + Soldcount + " / The Price: " + GrabThePrice + " / Card Name: " + cardname3 + "------ ID:" + i;
                console.log(textToAdd);
                // Append text to a file with a newline at the beginning
                fs.appendFileSync('C:\Users\lumin\Downloads\Txtillocation\cardWebsite.txt', textToAdd + '\n', 'utf8');

            }
            // Navigate back to the original URL
            await page.goto(url, { waitUntil: ["networkidle0", "domcontentloaded"] });
        }

    } catch (err) {
        console.error(`Error getting element value for URL: ${url}`, err);
        return null;
    }
}

async function processUrls(urls) {
    const browser = await initBrowser();
    const page = await browser.newPage();

    for (const url of urls) {
        const result = await getElementValue(page, url);
        if (result) {
            console.log(result);
            console.log(url);
        }
    }
    console.log("Closing browser...");
    await browser.close();
}

(async () => {
    while (true) {
        await processUrls(urls);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before the next iteration
    }
})();

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
