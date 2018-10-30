const _debug = true;

module.exports = {
  logger: (output) => {
    if(_debug) console.log(output);
    else return;
  }
};
