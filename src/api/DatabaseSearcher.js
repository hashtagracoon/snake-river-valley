import { logger } from "./Debugger";

module.exports = {

  searchDatabase(word, dbInstance) {

    return new Promise(function(resolve, reject) {

      let searchResultArray = [];

      dbInstance.transaction(tx => {
        logger("search \"" + word + "\" in database");
        let sql = `select * from words where lemma = ?;`;
        logger("execute sql = " + sql);
        tx.executeSql(
          sql,
          [word],
          (_, res) => {
            logger(res);
            logger(res.rows);
            for(let i = 0;i < res.rows.length; i++) {
              searchResultArray.push(res.rows.item(i));
            }
            logger("search in database ok");
            logger(searchResultArray);
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
          reject("Not Found");
        }
        else {
          logger("resolve");
          logger(searchResultArray);
          searchResultArray.map(entry => {

            // Process title
            entry.title = entry.lemma;
            delete entry.lemma;

            // Process source
            if(!entry.gram && !entry.pos) {
              entry.from = 'Wikipedia';
            }
            else {
              entry.from = 'Cambridge';
            }

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
            // Process examples
            entry.examples = entry.examples.split("|||");
            /*if(!entry.examples[entry.examples.length - 1]) {
              entry.examples.splice(entry.examples.length - 1, 1);
            }*/
            for(let i = 0; i < entry.meanings.length; i++) {
              entry.examples[i] = entry.examples[i].split("###");
              if(!entry.examples[i][entry.examples[i].length - 1]) {
                entry.examples[i].splice(entry.examples[i].length - 1, 1);
              }
              entry.meanings[i].egs = entry.examples[i];
            }
            delete entry.examples;
          });
          logger("after processed");
          logger(searchResultArray);
          resolve(searchResultArray);
        }
      });


    });
  }

};
