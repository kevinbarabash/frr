var React = require('react');
var Rx = require('rx');

function randomInt(max) {
    return Math.floor(max * Math.random());
}

function randomColor() {
    var col = [255, 255, 255].map(randomInt);
    return ("rgb(" + col.join(',') + ")");
}

function eventToPoint(e) {
    return {
        x: parseFloat(e.pageX),
        y: parseFloat(e.pageY)
    };
}

var i = 0;
var j = 0;

var ____Class1c=React.Component;for(var ____Class1c____Key in ____Class1c){if(____Class1c.hasOwnProperty(____Class1c____Key)){DraggableDiv[____Class1c____Key]=____Class1c[____Class1c____Key];}}var ____SuperProtoOf____Class1c=____Class1c===null?null:____Class1c.prototype;DraggableDiv.prototype=Object.create(____SuperProtoOf____Class1c);DraggableDiv.prototype.constructor=DraggableDiv;DraggableDiv.__superConstructor__=____Class1c;
    function DraggableDiv() {"use strict";
        this.state = {
            width: 100,
            height: 100,
            x: randomInt(800),
            y: randomInt(600),
            color: randomColor()
        };
        
        this.handleDown = this.handleDown.bind(this);
        this.handleTap = this.handleTap.bind(this);
        this.handleDoubleTap = this.handleDoubleTap.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
    Object.defineProperty(DraggableDiv.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";
        var elem = React.findDOMNode(this);
        
        var downs = Rx.Observable.fromEvent(elem, "mousedown").map(eventToPoint);
        var moves = Rx.Observable.fromEvent(document, "mousemove").map(eventToPoint);
        var ups = Rx.Observable.fromEvent(document, "mouseup").map(eventToPoint);
        
        // TODO include distance
        var taps = downs.flatMap(function(down)  {
            var timer = Rx.Observable.timer(300);
            return ups.take(1).takeUntil(timer);
        });
        
        taps.subscribe(this.handleTap);
        
        var doubleTaps = taps.flatMap(function(tap)  {
            var timer = Rx.Observable.timer(500);
            return taps.takeUntil(timer).takeUntil(doubleTaps).take(1);
        });
        
        doubleTaps.subscribe(this.handleDoubleTap);
        
        var drags = downs.flatMap(function(down)  {
            var offset = {
                x: down.x - this.state.x,
                y: down.y - this.state.y
            };
            return moves.takeUntil(ups).map(function(e)  {
                return {
                    x: e.x - offset.x,
                    y: e.y - offset.y
                }; 
            });
        }.bind(this));
        
        drags.subscribe(this.handleDrag);
    }});
    
    Object.defineProperty(DraggableDiv.prototype,"componentWillUnmount",{writable:true,configurable:true,value:function() {"use strict";
        
    }});
    
    Object.defineProperty(DraggableDiv.prototype,"handleDown",{writable:true,configurable:true,value:function(e) {"use strict";

    }});
    
    Object.defineProperty(DraggableDiv.prototype,"handleMove",{writable:true,configurable:true,value:function(e) {"use strict";
        
    }});
    
    Object.defineProperty(DraggableDiv.prototype,"handleUp",{writable:true,configurable:true,value:function(e) {"use strict";
        
    }});
    
    Object.defineProperty(DraggableDiv.prototype,"handleTap",{writable:true,configurable:true,value:function(e) {"use strict";
        console.log("tap: " + (i++));
        //this.setState({ color: randomColor() });
    }});

    Object.defineProperty(DraggableDiv.prototype,"handleDoubleTap",{writable:true,configurable:true,value:function(e) {"use strict";
        this.setState({ color: randomColor() });
    }});
    
    Object.defineProperty(DraggableDiv.prototype,"handleDrag",{writable:true,configurable:true,value:function(e) {"use strict";
        this.setState(e);
    }});

    Object.defineProperty(DraggableDiv.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var style = {
            position: 'absolute',
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.color
        };
        return React.createElement("div", {style: style});
    }});


module.exports = DraggableDiv;
