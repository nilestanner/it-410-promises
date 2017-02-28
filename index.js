/*jshint esversion: 6 */

var path = require('path');
var fs = require('fs');

exports.resolvedPath = function(directoryPath,fileName){
  return path.resolve(directoryPath, fileName);
};


exports.readFile = function(filePath){
  return new Promise(function(resolve,reject){
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err){
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.readDir = function(dirPath){
  return new Promise(function(resolve,reject){
    fs.readdir(dirPath, (err, data) => {
      if (err){
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.readDirFiles = function(dirPath){
  var filePromises = [];
  return exports.readDir(dirPath).then((filesPath) => {
    filesPath.forEach((filePath) => {
      filePromises.push(exports.readFile(exports.resolvedPath(dirPath,filePath)));
    });
    return Promise.all(filePromises);
  });
};
