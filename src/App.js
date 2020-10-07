import React ,{ Component } from 'react';
import Button from './components/Button';
import './components/Style.css';
import Container from '@material-ui/core/Container';

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      current : '0',
      prev : [],
      nextReset : false
    }
  }

  reset = () => {
    this.setState({ current: "0" , prev : [] , nextReset : false});
  };

  addToCurrent = (symbol) => {
    if (["/", "*", "-", "+"].indexOf(symbol) > -1) {
      let { prev } = this.state;
      prev.push(this.state.current + " " + symbol);
      this.setState({ prev : prev , nextReset : true });
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") || this.state.nextReset
        ) {
        this.setState({ current: symbol , nextReset : false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };
  
  calculate = (symbol) =>{
    let { current , prev , nextReset } = this.state;
    current = eval(String(prev[prev.length - 1] + current))
    this.setState({ current , prev : [] , nextReset : true })
  }

  backSpace = () => {
    let { current } = this.state;
    if (current.length >= 2) {
      this.setState({ current: current.slice(0, -1) });
    } else {
      this.setState({ current: "0" });
    }
  };

  render(){

    const buttons = [
      { symbol: "C", cols: 2, action: this.reset },
      { symbol: "DEL", cols: 1, action: this.backSpace },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate },
    ];

    return (
      <Container className="App" maxWidth="sm">

        { this.state.prev.length > 0 ? 
        <div className="prev-display">
          {this.state.prev[this.state.prev.length - 1]}
        </div>
         : null
         }

        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn , i) => {
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}

      </Container>
    );
  }
}

export default App;
