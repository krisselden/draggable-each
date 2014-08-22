'use strict';

var path = require('path');
var fs   = require('fs');

function DraggableEach(project) {
  this.project = project;
  this.name    = 'draggable-each';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

DraggableEach.prototype.treeFor = function treeFor(name) {
  var treePath;
  if(name === 'bower_components') {
    treePath = path.join(__dirname, 'bower_components');

    if (fs.existsSync(treePath)) {
      return unwatchedTree(treePath);
    }
  }else if(name === 'app'){
    treePath = path.join(this.root, 'app');
    var tree;

    if (fs.existsSync(treePath)) {
      if (process.env.EMBER_ADDON_ENV === 'development') {
        tree = treePath;
      } else {
        tree = unwatchedTree(treePath);
      }
    }

    return tree;
  }

};

DraggableEach.prototype.included = function(app){
  app.import('bower_components/jquery-ui-sortable/jquery-ui-sortable.js');
}

module.exports = DraggableEach;
