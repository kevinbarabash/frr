var React = require('react');
var DraggableDiv = require('./DraggableDiv');

React.render(React.createElement("div", null, 
    React.createElement(DraggableDiv, null), 
    React.createElement(DraggableDiv, null), 
    React.createElement(DraggableDiv, null)
), document.body);

console.log("asdfadsf");
