import React from 'react';
import ResultPanel from './ResultPanel';
import ButtonPanel from './ButtonPanel';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      last: '',
      cur: '0'
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(type) {
    var cur;
    var lastLetter;
    switch (type) {
    case 'c':
      this.setState({
        last: '',
        cur: '0'
      });
      break;
    case 'back':
      this.setState({
        cur: this.state.cur === '0' ? this.state.cur : this.state.cur.slice(0, -1) || '0'
      });
      break;
    case '=':
      try {
        this.setState({
          last: this.state.cur + '=',
          cur: eval(this.state.cur) + ''
        });
      } catch (e) {
        this.setState({
          last: this.state.cur + '=',
          cur: 'NaN'
        });
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      cur = this.state.cur;
      lastLetter = cur.slice(-1);
      if (lastLetter === '+' || lastLetter === '-' || lastLetter === '*' || lastLetter === '/')
        this.setState({
          cur: cur.slice(0, -1) + type
        });
      else
        this.setState({
          cur: this.state.cur + type
        });
      break;
    case '.':
      cur = this.state.cur;
      lastLetter = cur.slice(-1);
      if (lastLetter !== '.') {
        this.setState({
          cur: this.state.cur + type
        });
      }
      break;
    default:
      this.setState({
        cur: this.state.cur === '0' ? type : this.state.cur + type
      });
      break;
    }
  }
  render() {
    var exp = {
      cur: this.state.cur,
      last: this.state.last
    };
    return (
      <div className="react-calculator">
        <ResultPanel exp={exp}/>
        <ButtonPanel onClick={this.onButtonClick}/>
      </div>
    );
  }
}