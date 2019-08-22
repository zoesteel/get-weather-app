import React, {Component} from 'react';

class SearchForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            city: '',            
            temperature: '',
            units: 'metric',
            symbol: 'C',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
    }

    // handles change in input box
    handleChange(e) {
        this.setState({ 
          city: e.target.value
        });
    }

    // handles change in radio buttons for imperial or metric
    handleUnitChange = (e) => {
        this.setState({
            units: e.target.value,
            symbol: e.target.id,
        })
    }

    // handles form submission
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

        if (response.status !== 200) throw Error(body.message);
        
        this.setState({ 
            cityName: body.city,
            temperature: body.temperature,
            description: body.description,
            message: `The temperature in ${body.city} is ${body.temperature}°${this.state.symbol}`,
            error: body.error
        });

        // pass the result back to the app
        this.props.onSearchComplete(this.state.cityName, this.state.temperature, this.state.units, this.state.symbol, this.state.description, this.state.error);
    };

    render () {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <label 
                    htmlFor="city">Enter city:
                </label>
                
                <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.city}
                    id="city"                   
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
                        htmlFor="C">Celcius
                    </label>
                    <input 
                        type="radio" 
                        name="units" 
                        value="imperial" 
                        id="F" 
                    />
                    <label 
                        htmlFor="F">Fahrenheit
                    </label>                            
                </div>
                <button type="submit">SUBMIT</button>
            </form>
        )
    }
}

export default SearchForm;