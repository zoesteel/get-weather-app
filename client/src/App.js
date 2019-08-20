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
            error: undefined
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

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="title">Check the weather</h1>
                    <CitySearch 
                        onSearchComplete={this.handleSearch}
                    />

                    { this.state.error === undefined &&
                        <div>
                            <h2>{this.state.description}</h2>                    
                            <p>{this.state.message}</p>     
                        </div>
                    }
                   
                    { this.state.error !== undefined && 
                         <p>{this.state.error}</p>
                    }
                </header>
            </div>
        );
    }
}

export default App;