const cheerio = require("cheerio-without-node-native");
const fetch = require("node-fetch");

var parseWebster = (body) => {
  let $ = cheerio.load(body);

  let posArray = [];
  $('.row.entry-header span.fl a.important-blue-link').each(function(i, elem) {
    console.log($(this).text());
    posArray.push($(this).text());
  });

  let pronArray = [];
  $('span.prs span.pr').not(':has(span)').each(function(i, elem) {
    if($(this).prev().text() === '\\') {
      console.log($(this).text());
      pronArray.push($(this).text());
    }
  });

  let mp3Array = [];
  $('a.play-pron.hw-play-pron').each(function(i, elem) {
    let data_lang = $(this).attr('data-lang').split('_');
    let data_file = $(this).attr('data-file');
    let data_dir = $(this).attr('data-dir');
    mp3Array.push(`https://media.merriam-webster.com/audio/prons/${data_lang[0]}/${data_lang[1]}/mp3/${data_dir}/${data_file}.mp3`);
    console.log(mp3Array[mp3Array.length - 1]);
  });

  let meaningsArray = [];
  const limitLength = 2;
  // each entry-1, entry-2 is a different pos (verb, noun...)
  // each .sb is a different meaning
  $('#dictionary-entry-1 .vg .sb').each(function(i, elem) {
    for(let i = 0; i < limitLength; i++) {
      console.log(`<${i}>`);
      // each .sb-0, .sb-1 is a different sub-meaning
      let entry = $(this).find(`span.sb-${i}`).find('span .dtText').first().text();
      entry = entry.split('\n');
      entry = entry[0];
      if(entry.startsWith(': ')) entry = entry.slice(2);
      console.log('meaning: ' + entry);
      
      let example = $(this).find(`span.sb-${i} .ex-sent`).text();
      console.log('example: ' + example);

      console.log('=======');
    }
  });

  // example sentences
  // $('#dictionary-entry-1 .vg .sb span.sb-0 .ex-sent') 
  

};

var searchWebster = (word) => {

  return new Promise((resolve, reject) => {

    console.log("*** search at webster ***");

    let url = "https://www.merriam-webster.com/dictionary/" + word;
    console.log(url);

    fetch(url).then((response) => {
      return response.text();
    })
    .then((text) => {

      let searchResultArray = parseWebster(text);
/*
      if(searchResultArray.length === 0) {
        logger("Unable to find this word at webster");
        reject("Not Found");
      }
      else {
        logger("Get Search Result from webster: ")
        logger(searchResultArray);
        resolve(searchResultArray);
      }
*/
    })
    .catch((err) => {
      console.log("search word from webster error: " + err);
      reject("Error");
    });

  });
};

searchWebster('address');
