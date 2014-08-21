'use strict';

var path      = require('path');
var fs        = require('fs');

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
  if(name !== 'bower_components') { return; }

  var treePath = path.join(__dirname, 'bower_components');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

DraggableEach.prototype.included = function(app){
  app.import('bower_components/jquery-ui-sortable/jquery-ui-sortable.js');
}

module.exports = DraggableEach;
