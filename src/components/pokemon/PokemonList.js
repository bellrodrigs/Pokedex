import React, { Component } from 'react'
import PokemonCard from './PokemonCard';
import axios from 'axios';


export default class PokemonList extends Component {
    state = {
        limit: 1000,
        //  url: `https://pokeapi.co/api/v2/pokemon/?limit=897`,
        url: `https://pokeapi.co/api/v2/pokemon/`,
        pokemon: [],
        next: '',
        previous: '',
        filtered: [],
        query: ''

    };

    async componentDidMount() {
        let res = await axios.get(this.state.url);        
             
        this.setState({ pokemon: res.data['results'] })
        this.setState({ next: res.data.next })

    }

    async next() {
        const res = await axios.get(this.state.next);
        this.setState({ pokemon: res.data['results'] })
        this.setState({ next: res.data.next })
        this.setState({ previous: res.data.previous })

        if (res.data.next) {
            this.setState({ next: res.data.next })
        } else {
            this.setState({ next: '' })
        }
    }
    async previous() {
        const res = await axios.get(this.state.previous)
        
        this.setState({ pokemon: res.data['results'] })
        this.setState({ next: res.data.next })

        if (res.data.previous) {
            this.setState({ previous: res.data.previous })
        } else {
            this.setState({ previous: '' })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.pokemon ? (<div className="row">
                        {this.state.pokemon.map(pokemon => (
                            <PokemonCard
                                key={pokemon.name}
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))}
                    </div>)
                        : (<h1>carregando pokemon</h1>)}
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-secondary btn-custom mr-3 mb-3" disabled={this.state.previous === ''} onClick={() => this.previous()}> &laquo; previous</button>
                        <button className="btn btn-primary mb-3" disabled={this.state.next === ''} onClick={() => this.next()}>  next &raquo;</button>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}
