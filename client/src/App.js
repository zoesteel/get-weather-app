import React, {Component} from 'react';
import './styles/App.scss';
import SunIcon from './images/sun.png';
import SearchForm from './components/SearchForm';
import ResultMessage from './components/ResultMessage';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: '',
            cityName: '',
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
    handleSearch(cityName, temperature, units, symbol, description, error) {
        this.setState({
            cityName: cityName,
            temperature: temperature,
            units: units,
            symbol: symbol,
            description: description,
            error: error,
            message: `The temperature in ${cityName} is ${temperature}°${symbol}`,
        });
    }

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="app-title">Check the weather</h1>
                    
                    {/* the weather result or error message */}
                    <ResultMessage 
                        description={this.state.description}
                        message={this.state.message}
                        error={this.state.error}
                    />
                    
                    {/* the city input form */}
                    <SearchForm 
                        onSearchComplete={this.handleSearch}
                    />

                </header>
            </div>
        );
    }
}

export default App;