'use strict';

// bpmn-js
var BpmnViewer = require('bpmn-js');

var AppendHook = function(diagram) {
  this.diagram     = diagram;
};

AppendHook.prototype.hook = function hook(node) {

  var that = this;

  if(!this.diagram.element.children.length) {
    
    // Import
    this.diagram.viewer = new BpmnViewer({container: this.diagram.element});

    this.diagram.viewer.importXML(this.diagram.xml, function(err) {

      if (!err) {
        that.diagram.viewer.get('canvas').zoom('fit-viewport');
      } else {
        throw new Error('Failed to load diagram', err);
      }

      if(that.diagram.options.interactive) {
        that.diagram.addInteraction();
      }

    });

  }

  node.appendChild(this.diagram.element);

};

module.exports = AppendHook;