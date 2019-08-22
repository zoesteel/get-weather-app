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
            units: 'metric',
            symbol: 'C',
            description: '',
            message: '',
            error: undefined,            
        }        
    }
      
    // callApi = async () => {
    //     const response = await fetch('/weather');
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
        
    //     return body;
    // };
      
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                city: this.state.city,
                units: this.state.units
            }),
        });
       
        const body = await response.json();
        this.setState({ 
            city: body.city,
            temperature: body.temperature,
            description: body.description,
            message: `The temperature in ${body.city} is ${body.temperature}°${this.state.symbol}`,
         });
    };

    // handles change in radio buttons for imperial or metric
    handleUnitChange = (e) => {
        this.setState({
            units: e.target.value,
            symbol: e.target.id,
        })
    }

    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={SunIcon} alt="sun icon" className="sun" />
                    <h1 className="title">Check the weather</h1>
                    
                    {/* the input form  */}
                    {/* <CitySearch 
                        onSearchComplete={this.handleSearch}
                    />
                     */}
                    {/* code for api call within react */}
                    {/* if no error message exists then display the weather message */}
                    {/* { this.state.error === undefined &&
                        <div>
                            <h2>{this.state.description}</h2>                    
                            <p>{this.state.message}</p>     
                        </div>
                    } */}

                    {/* if error exists then display it */}
                    { this.state.error !== undefined && 
                         <p>{this.state.error}</p>
                    }

                    <form onSubmit={this.handleSubmit} className="form">
                        <input
                            type="text"
                            value={this.state.city}
                            id="city"
                            onChange={e => this.setState({ 
                                city: e.target.value 
                            })}
                        />
                        
                        <div onChange={this.handleUnitChange}>
                            <input 
                                type="radio" 
                                name="units" 
                                value="metric" 
                                id="C"
                                defaultChecked
                            />
                            <label 
                                htmlFor="celcius">Celcius
                            </label>
                            <input 
                                type="radio" 
                                name="units" 
                                value="imperial" 
                                id="F" 
                            />
                            <label 
                                htmlFor="fahrenheit">Fahrenheit
                            </label>                            
                        </div>
                        <button type="submit">Submit</button>
                    </form>

                    <div>
                        <h2>{this.state.description}</h2>                    
                        <p>{this.state.message}</p>     
                    </div>

                </header>
            </div>
        );
    }
}

export default App;