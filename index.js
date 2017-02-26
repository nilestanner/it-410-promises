/*jshint esversion: 6 */
// const fs = require('fs');
// var  exports = module.exports = {};


let resolvedPath = function(directoryPath,fileName){
  return directoryPath + fileName;
};


let readFile = function(filePath){
  return new Promise(function(resolve,reject){
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err){
        reject(err);
      }
      resolve(data);
    });
  });
};

let readDir = function(dirPath){
  return new Promise(function(resolve,reject){
    fs.readdir(dirPath, (err, data) => {
      if (err){
        reject(err);
      }
      resolve(data);
    });
  });
};

let readDirFiles = function(dirPath){
  let filePromises = [];
  readDir(dirPath).then((filesPath) => {
    files.forEach((filePath) => {
      filePromises.push(readFile(resolvedPath(dirPath,filePath)));
    });
  });
  Promise.all(filePromises).then((files) => {
    console.log(files);
    return files;
  });
  //find some way to resolve all promises
};

// exports = {
//   resolvedPath:resolvedPath,
//   readFile:readFile,
//   readDir:readDir,
//   readDirFiles:readDirFiles
// };

readFile('./fork.js').then((data) => {
  console.log(data);
}).catch((data) => {
  console.log('error',data);
});
