var React = require('react');
var Rx = require('rx');

function randomInt(max) {
    return Math.floor(max * Math.random());
}

function randomColor() {
    var col = [255, 255, 255].map(randomInt);
    return `rgb(${col.join(',')})`;
}

function eventToPoint(e) {
    return {
        x: parseFloat(e.pageX),
        y: parseFloat(e.pageY)
    };
}

var i = 0;
var j = 0;

class DraggableDiv extends React.Component {
    constructor() {
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
    componentDidMount() {
        var elem = React.findDOMNode(this);
        
        var downs = Rx.Observable.fromEvent(elem, "mousedown").map(eventToPoint);
        var moves = Rx.Observable.fromEvent(document, "mousemove").map(eventToPoint);
        var ups = Rx.Observable.fromEvent(document, "mouseup").map(eventToPoint);
        
        // TODO include distance
        var taps = downs.flatMap(down => {
            var timer = Rx.Observable.timer(300);
            return ups.take(1).takeUntil(timer);
        });
        
        taps.subscribe(this.handleTap);
        
        var doubleTaps = taps.flatMap(tap => {
            var timer = Rx.Observable.timer(500);
            return taps.takeUntil(timer).takeUntil(doubleTaps).take(1);
        });
        
        doubleTaps.subscribe(this.handleDoubleTap);
        
        var drags = downs.flatMap(down => {
            var offset = {
                x: down.x - this.state.x,
                y: down.y - this.state.y
            };
            return moves.takeUntil(ups).map(e => {
                return {
                    x: e.x - offset.x,
                    y: e.y - offset.y
                }; 
            });
        });
        
        drags.subscribe(this.handleDrag);
    }
    
    componentWillUnmount() {
        
    }
    
    handleDown(e) {

    }
    
    handleMove(e) {
        
    }
    
    handleUp(e) {
        
    }
    
    handleTap(e) {
        console.log("tap: " + (i++));
        //this.setState({ color: randomColor() });
    }

    handleDoubleTap(e) {
        this.setState({ color: randomColor() });
    }
    
    handleDrag(e) {
        this.setState(e);
    }

    render() {
        var style = {
            position: 'absolute',
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.color
        };
        return <div style={style}></div>;
    }
}

module.exports = DraggableDiv;
