import React, {Component} from 'react';
import './App.scss';
import SunIcon from './images/sun.png';
import SearchForm from './SearchForm';

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
        }        
        this.handleSearch = this.handleSearch.bind(this);
    }

    // handles the API response
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
      
    // callApi = async () => {
    //     const response = await fetch('/weather');
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
        
    //     return body;
    // };

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="title">Check the weather</h1>
                    
                    {/* if no error message exists then display the weather message */}
                    { this.state.error === undefined &&
                    <div className="weather-result">
                        <h2>{this.state.description}</h2>                    
                        <p>{this.state.message}</p>     
                    </div>
                    }

                    {/* if error exists then display it */}
                    { this.state.error !== undefined && 
                         <p>{this.state.error}</p>
                    }
                    
                    <SearchForm 
                        onSearchComplete={this.handleSearch}
                    />

                    
                </header>
            </div>
        );
    }
}

export default App;