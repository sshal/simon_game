import React from "react";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.power = false;
        this.strictm = false;
        this.count = "-";
        this.timer = "-";
        this.wincom = [];
        this.answers = 0;
        this.st_id = [];
        this.switchGame = this.switchGame.bind(this);
        this.selectStrict = this.selectStrict.bind(this);
        this.startGame = this.startGame.bind(this);
        this.showCombi = this.showCombi.bind(this);
        this.selectCell = this.selectCell.bind(this);
        this.reset = this.reset.bind(this);
    }
    init() {
        this.count = "-";
        this.timer = "-";
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
        var comb = this.wincom,
            st_id = [];
        this.answers = 0;
        if (this.count === "-") {
            comb.push((Math.floor(Math.random() * 4) + 1).toString());
            this.count = 1;
        }
        for (var i = 0; i < comb.length; i += 1) {
            let cell = 'c' + comb[i];
            var delay = i * 1600;
            var lightShow = setTimeout(function(){
                document.getElementById(cell).classList.add('light');
            }, delay);
            var lightHide = setTimeout(function(){
                document.getElementById(cell).classList.remove('light');
            }, (delay + 800));
            st_id.push(lightShow, lightHide);
        }
        st_id.push(setTimeout(function(){
            document.getElementById('waiting').classList.remove('unavailable');
        }, (delay + 800)));
        this.st_id = st_id;
        this.setState({});
    }
    selectCell(e) {
        var cell = e.target.id;
        this.answers += 1;
        if (cell[1] !== this.wincom[this.answers-1]){
            document.getElementById('waiting').classList.add('unavailable');
            if(this.strictm) {
                this.init();
            }
            setTimeout(this.showCombi, 1000);
        } else if (this.answers === this.count) {
            document.getElementById('waiting').classList.add('unavailable');
            this.wincom.push((Math.floor(Math.random() * 4) + 1).toString());
            this.count += 1;
            setTimeout(this.showCombi, 1000);
        }
        this.setState({});
    }
    lightOn(e) {
        document.getElementById(e.target.id).classList.add('light');
    }
    lightOff(e) {
        document.getElementById(e.target.id).classList.remove('light');
    }
    reset() {
        for (var id of this.st_id) {
            clearTimeout(id);
        }
        ["c1","c2","c3","c4"].forEach((a) => document.getElementById(a).classList.remove('light'));
        this.init();
    }
    render() {
        return (
            <div>
                <div className="mainboard">
                    <div className="outc1 cells">
                        <div id="c1" className="colorcell point" onClick={this.selectCell} onMouseDown={this.lightOn} onMouseUp={this.lightOff}></div>
                    </div>
                    <div className="outc2 cells">
                        <div id="c2" className="colorcell point" onClick={this.selectCell} onMouseDown={this.lightOn} onMouseUp={this.lightOff}></div>
                    </div>
                    <div className="outc3 cells">
                        <div id="c3" className="colorcell point" onClick={this.selectCell} onMouseDown={this.lightOn} onMouseUp={this.lightOff}></div>
                    </div>
                    <div className="outc4 cells">
                        <div id="c4" className="colorcell point" onClick={this.selectCell} onMouseDown={this.lightOn} onMouseUp={this.lightOff}></div>
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
                                <div id="period">{this.timer}</div>
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
            </div>
        )
    }
}

module.exports = Game;
