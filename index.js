/*jshint esversion: 6 */
// const fs = require('fs');
var  exports = module.exports = {};


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
  let foundFiles = [];
  readDir(dirPath).then((filesPath) => {
    files.forEach((filePath) => {
      readFile(resolvedPath(dirPath,filePath)).then((file) => {
        foundFiles.push(file);
      });
    });
  });
  //find some way to resolve all promises
};

exports = {
  resolvedPath:resolvedPath,
  readFile:readFile,
  readDir:readDir,
  readDirFiles:readDirFiles
};
