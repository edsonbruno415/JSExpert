'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watch(event, filename) {
    console.log('this',this);
    console.log('args', arguments);
    this.showContent(filename);
  }
  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

/* watch(__filename, async(event, filename)=>{
  console.log((await readFile(filename)).toString());
}); */

const file = new File();

//ignora this da classe file
// herda this do watch
// watch(__filename, file.watch);

// watch(__filename, (event, filename) => file.watch(event, filename));

//bind retornar função com o this do FILE
//watch(__filename, file.watch.bind(file));

file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey sinon') }, [null, __filename]);