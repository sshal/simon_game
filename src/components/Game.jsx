import React from "react";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.power = false;
        this.strictm = false;
        this.count = "-";
        this.timer= {
            num: "-",
            id: ""
        };
        this.sounds = {
            c1: "http://d.zaix.ru/3DG3.mp3",
            c2: "http://d.zaix.ru/3DGD.mp3",
            c3: "http://d.zaix.ru/3DG6.mp3",
            c4: "http://d.zaix.ru/3DG9.mp3"
        };
        this.wincom = [];
        this.answers = 0;
        this.st_id = [];
        this.init = this.init.bind(this);
        this.switchGame = this.switchGame.bind(this);
        this.selectStrict = this.selectStrict.bind(this);
        this.startGame = this.startGame.bind(this);
        this.showCombi = this.showCombi.bind(this);
        this.startCounter = this.startCounter.bind(this);
        this.selectCell = this.selectCell.bind(this);
        this.noteMistake = this.noteMistake.bind(this);
        this.lightOn = this.lightOn.bind(this);
        this.lightOff = this.lightOff.bind(this);
        this.turnOn = this.turnOn.bind(this);
        this.turnOff = this.turnOff.bind(this);
        this.reset = this.reset.bind(this);
    }
    init() {
        this.count = "-";
        this.timer.num = "-";
        this.wincom = [];
        this.answers = 0;
    }
    switchGame() {
        var butStyle = document.getElementById('switch').classList;
        if (!this.power) {
            butStyle.add('switchon');
            this.power = true;
        } else {
            butStyle.remove('switchon');
            this.power = false;
            this.strictm = false;
            document.getElementById('strictmode').classList.remove('stricton');
            this.reset();
        }
        this.setState({});
    }
    selectStrict() {
        var butStyle = document.getElementById('strictmode').classList;
        if (!this.strictm && this.power) {
            butStyle.add('stricton');
            this.strictm = true;
        } else {
            butStyle.remove('stricton');
            this.strictm = false;
        }
    }
    startGame() {
        if (this.power) {
            this.reset();
            document.getElementById('waiting').classList.add('unavailable');
            setTimeout(this.showCombi, 1000);
        }
        this.setState({});
    }
    showCombi() {
        var comb = this.wincom;
        this.answers = 0;
        this.timer.num = "-";
        if (this.count === "-") {
            comb.push((Math.floor(Math.random() * 4) + 1).toString());
            this.count = 1;
        }
        for (var i = 0; i < comb.length; i += 1) {
            let cell = 'c' + comb[i];
            var delay = i * 1600;
            (function show(obj) {
                obj.st_id.push(setTimeout(function(){
                    obj.lightOn(cell);
                }, delay));
                obj.st_id.push(setTimeout(function(){
                    obj.lightOff(cell);
                }, (delay + 1000)));
            }(this));
        }
        this.st_id.push(setTimeout(function(){
            document.getElementById('waiting').classList.remove('unavailable');
        }, delay + 1000));
        this.st_id.push(setTimeout(this.startCounter, delay + 1000));
        this.setState({});
    }
    startCounter() {
        clearInterval(this.timer.id);
        var cou = this.count;
        this.timer.num = 5;
        this.setState({});
        (function subtractNum(obj) {
            obj.timer.id = setInterval(function(){
                obj.timer.num -= 1;
                obj.setState({}, function() {
                    if (obj.timer.num === 0) {
                        clearInterval(obj.timer.id);
                        obj.noteMistake();
                    }});
            }, 1000);
            obj.st_id.push(obj.timer.id);
        }(this));
    }
    selectCell(e) {
        this.startCounter();
        var cell = e.target.id;
        this.answers += 1;
        if (cell[1] !== this.wincom[this.answers-1]){
            document.getElementById('waiting').classList.add('unavailable');
            clearInterval(this.timer.id);
            this.noteMistake();
        } else if (this.answers === this.count) {
            clearInterval(this.timer.id);
            if (this.count === 20) {
                document.getElementById('setup').insertAdjacentHTML('afterend',
                "<div id='winmess'><p class='message'>You win!</p><audio id='win' autoplay src='http://d.zaix.ru/3DG8.mp3'></audio></div>");
                document.getElementById('waiting').classList.add('unavailable');
                setTimeout(function(){
                    document.getElementById('board').removeChild(document.getElementById('winmess'));
                }, 5000);
                this.st_id.push(setTimeout(this.startGame, 5000));
            } else {
                clearInterval(this.timer.id);
                document.getElementById('waiting').classList.add('unavailable');
                this.wincom.push((Math.floor(Math.random() * 4) + 1).toString());
                this.count += 1;
                this.st_id.push(setTimeout(this.showCombi, 1000));
            }
        }
        this.setState({});
    }
    noteMistake() {
        var prevCount = this.count;
        this.count = "X";
        this.timer.num = "X";
        document.getElementById('setup').insertAdjacentHTML('afterend',"<audio id='error' autoplay src='http://d.zaix.ru/3DFQ.mp3'></audio>");
        setTimeout(function(){document.getElementById('board').removeChild(document.getElementById('error'))}, 1000);
        (function resumeGame(obj, prev) {
            obj.st_id.push(setTimeout(function() {(obj.strictm) ? obj.init() : obj.count = prev;}, 2000),
                            setTimeout(obj.showCombi, 3000));
        }(this, prevCount));
        this.setState({});
    }
    lightOn(id) {
        document.getElementById(id).classList.add('light');
        document.getElementById("board").insertAdjacentHTML('beforeend',`<audio id=${"m" + id} autoplay src=${this.sounds[id]}></audio>`);
    }
    lightOff(id) {
        document.getElementById(id).classList.remove('light');
        document.getElementById("board").removeChild(document.getElementById("m" + id));
    }
    turnOn(e) {
        this.lightOn(e.target.id);
    }
    turnOff(e) {
        this.lightOff(e.target.id);
    }
    reset() {
        for (var id of this.st_id) {
            clearTimeout(id);
        }
        this.st_id = [];
        ["c1","c2","c3","c4"].forEach(function(a) {
            document.getElementById(a).classList.remove('light');
        });
        for (var m of document.getElementsByTagName("audio")) {
            document.getElementById('board').removeChild(m);
        }
        this.init();
    }
    render() {
        return (
            <div id="board" className="mainboard">
                <div className="outc1 cells">
                    <div id="c1" className="colorcell point" onClick={this.selectCell} onMouseDown={this.turnOn} onMouseUp={this.turnOff}></div>
                </div>
                <div className="outc2 cells">
                    <div id="c2" className="colorcell point" onClick={this.selectCell} onMouseDown={this.turnOn} onMouseUp={this.turnOff}></div>
                </div>
                <div className="outc3 cells">
                    <div id="c3" className="colorcell point" onClick={this.selectCell} onMouseDown={this.turnOn} onMouseUp={this.turnOff}></div>
                </div>
                <div className="outc4 cells">
                    <div id="c4" className="colorcell point" onClick={this.selectCell} onMouseDown={this.turnOn} onMouseUp={this.turnOff}></div>
                </div>
                <div id="waiting" className="unavailable"></div>
                <div id="setup">
                    <div>
                        <div id="title">Simon<span className="sign">&#174;</span></div>
                        <div className="half marl">
                            <div id="counter">{this.count}</div>
                            <div className="btitle">count</div>
                            <div id="start" className="but point" onClick={this.startGame}></div>
                            <div className="btitle">start</div>
                        </div>
                        <div className="half">
                            <div id="period">{this.timer.num}</div>
                            <div className="btitle">time</div>
                            <div id="strictmode" className="but point" onClick={this.selectStrict}></div>
                            <div className="btitle">strict</div>
                        </div>
                    </div>
                    <div className="onoff">
                        <div className="but point" onClick={this.switchGame}>
                            <div id="switch" className="inbut"></div>
                        </div>
                        <div className="btitle">on / off</div>
                    </div>
                </div>
            </div>
    )}
}

module.exports = Game;
