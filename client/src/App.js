import React, {Component} from 'react';
import './App.scss';
import SunIcon from './images/sun.png';
import CitySearch from './CitySearch';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: '',
            temperature: '',
            units: '',
            symbol: '',
            description: '',
            message: '',
            error: undefined,
            response: '',
            post: '',
            responseToPost: '',
        }        
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(city, temperature, units, symbol, description, error) {
        this.setState({
            city: city,
            temperature: temperature,
            units: units,
            symbol: symbol,
            description: description,
            error: error,
            message: `The temperature in ${city} is ${temperature}°${symbol}`,
        });
    }


    componentDidMount() {
        this.callApi1()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }
      
      callApi1 = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
      };
      
      handleSubmit1 = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        
        this.setState({ responseToPost: body });
      };

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="title">Check the weather</h1>
                    
                    {/* the input form  */}
                    <CitySearch 
                        onSearchComplete={this.handleSearch}
                    />

                    {/* if no error message exists then display the weather message */}
                    { this.state.error === undefined &&
                        <div>
                            <h2>{this.state.description}</h2>                    
                            <p>{this.state.message}</p>     
                        </div>
                    }

                    {/* if error exists then display it */}
                    { this.state.error !== undefined && 
                         <p>{this.state.error}</p>
                    }


                    <p>{this.state.response}</p>
                            <form onSubmit={this.handleSubmit1}>
                            <p>
                                <strong>Post to Server:</strong>
                            </p>
                            <input
                                type="text"
                                value={this.state.post}
                                onChange={e => this.setState({ post: e.target.value })}
                            />
                            <button type="submit">Submit</button>
                            </form>
                            <p> {this.state.response} {this.state.responseToPost}</p>
                </header>
            </div>
        );
    }
}

export default App;