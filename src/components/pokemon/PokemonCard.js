import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Pokemon from './Pokemon'
import {jQuery as $} from 'jquery';


const Card = styled.div` 
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transation: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select:none;
    -o-user-select:none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active{
        text-decoration: none ;
        color: black;
    }
`;


export default class PokemonCard extends Component {
    state = {
        name: '',
        namePoke:'',
        imageUrl: '',
        imageUrlPoke:'',
        pokemonIndex: '',
        imgLoading: true,
        toManyRequests: false,
        pokemonUrl: '',
        pokemonSpeciesUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilites: '',
        genderRationMale: '',
        genderRationFemale: '',
        evs: '',
        hatchSteps: '',
        newIndex: ''

    }
    async componentDidMount() {
        const { name, url } = this.props;
        const pokemonIndex = url.split('/');
        const imageUrl = `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${pokemonIndex[6]}.png`;
        await this.setState({ name: name, imageUrl: imageUrl, pokemonIndex: pokemonIndex[6] })

    }
    async setIndex(index){
        await this.setState({newIndex:index})
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${this.state.newIndex}`;
        const pokemonRes = await axios.get(pokemonUrl);
        console.log('é o index', pokemonRes)

        // await this.setState({ newIndex: index }, () => {
        //     console.log(this.state.newIndex, 'pokemonIndex');
        //   }); 
    }

    render() {

        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <StyledLink to={`Pokemon/${this.state.pokemonIndex}`}>
                {/* <Card className="card" data-toggle="modal" data-target="#modalExemplo" > */}
                <Card className="card" >
                    {/* <Pokemon data={this.state.namePoke} /> */}
                    {/* <h5 className="card-header">{this.state.pokemonIndex}</h5> */}
                    {this.state.toManyRequests ? (<h6 className="mx-auto"><span className="badge badge-danger mt-2">To many request</span></h6>) : null}
                    <img src={this.state.imageUrl} className="card-img-top rounded mx-auto mt-2 image-costum"
                        onLoad={() => this.setState({ imgLoading: false })}
                        onError={() => this.setState({ toManyRequests: true })} />
                    <div className="card-body mx-auto">
                        <h4 className="card-title">#{this.state.pokemonIndex} - {this.state.name.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}</h4>
                    </div>
                </Card>
                </StyledLink>
            </div>
        )
    }
}
