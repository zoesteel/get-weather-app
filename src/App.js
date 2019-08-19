import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/city');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);

    return body;
  };
  
  handleChange(event) {
    this.setState({ 
      city: event.target.value 
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/city?city=${encodeURIComponent(this.state.city)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter city: </label>
            <input
              id="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.weather}</p>
        </header>
      </div>
    );
  }
}

export default App;