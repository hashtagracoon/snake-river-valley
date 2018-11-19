import { logger } from "./Debugger";

module.exports = {

  searchDatabase(word, dbInstance) {

    return new Promise(function(resolve, reject) {

      let searchResultArray = [];

      dbInstance.transaction(tx => {
        logger("search \"" + word + "\" in database");
        let sql = `select * from words where lemma = ?;`;
        tx.executeSql(
          sql,
          [word],
          (_, res) => {
            logger(res.rows);
            for(let i = 0;i < res.rows.length; i++) {
              searchResultArray.push(res.rows.item(i));
            }
          }
        );
      },
      (error) => {
        logger("execute sql fail: " + error);
        reject("Not Found");
      },
      () => {
        logger("execute sql success");
        if(searchResultArray.length === 0) {
          logger("but not found in database");
          reject("Not Found");
        }
        else {
          searchResultArray.map(entry => {

            // Process title
            entry.title = entry.lemma;
            delete entry.lemma;

            // Process mp3
            const prefix = entry.title.replace(/-/g, '_').toLowerCase();
            const pos = entry.pos.replace(/ /g, '_').replace(/,/g, '');
            entry.mp3 = `${prefix}_${pos}.mp3`;
            //entry.mp3 = 'https://dictionary.cambridge.org/media/english/uk_pron/u/uka/ukada/ukadapt021.mp3';

            // Process meanings
            entry.meanings = entry.meanings.split("|||");
            if(!entry.meanings[entry.meanings.length - 1]) {
              entry.meanings.splice(entry.meanings.length - 1, 1);
            }
            for(let i = 0; i < entry.meanings.length; i++) {
              entry.meanings[i] = {
                meaning: entry.meanings[i],
                egs: []
              };
            }

            // Process source
            entry.from = 'Wikipedia';
            if(!entry.gram && !entry.pos) {
              entry.from = 'Wikipedia';
              logger(searchResultArray);
              resolve(searchResultArray);
            }
            else {
              entry.from = 'Cambridge';
            }

            // Process examples
            entry.examples = entry.examples.split("|||");

            for(let i = 0; i < entry.meanings.length; i++) {
              entry.examples[i] = entry.examples[i].split("###");
              if(!entry.examples[i][entry.examples[i].length - 1]) {
                entry.examples[i].splice(entry.examples[i].length - 1, 1);
              }
              entry.meanings[i].egs = entry.examples[i];
            }
            delete entry.examples;
          });
          logger(searchResultArray);
          resolve(searchResultArray);
        }
      });


    });
  }

};
