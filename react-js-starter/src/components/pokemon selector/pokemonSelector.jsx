import React from "react";
import PokemonCard from "./pokemonCard";
import SearchBar from './pokemonSearch';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const PokemonSelector = ({onClick, firstName, lastName, phoneNumber, address}) => {
    const [allPokemonData,setAllPokemonData]=useState([]);
    const [pokemonData,setPokemonData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon?limit=1008")
    const [pokedex,setPokedex]=useState();
	const [search, setSearch] = useState("");
    const [currentView, setCurrentView] = React.useState("pokemonSelector");

    const handleReview = (event) => {
        event.preventDefault();
        setCurrentView("review");
      };

    const fetchPokemonData = async() => {
        setLoading(true)
        const res = await axios.get(url);
        getPokemon(res.data.results)
        setLoading(false)
    }

    const getPokemon = async(res)=>{
       res.map(async(item) => {
          const result = await axios.get(item.url);
          setAllPokemonData(state => {
              state = [...state,result.data]
              state.sort((a,b) => a.id > b.id ? 1 : -1)
              return state;
          })
          setPokemonData(state => {
            state = [...state,result.data]
            state.sort((a,b) => a.id > b.id ? 1 : -1)
            return state;
        })
       })   
    }

    const PokemonInfo = ({ onClick, data }) => {
        return (
            <>
            {
                (!data) ? "" : (
                    <>
                        <h1>{data.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                        <div className="type">
                            <div className="group">
                            <h2>Typing(s):</h2>
                            {
                                data.types.map(poke=>{
                                    return(
                                            <h2>{poke.type.name}</h2>
                                    )
                                })
                            }
                            <button onClick={handleReview}>Next</button>
                            </div>  
                        </div>
                    </>
                )
            }
            </>
        )
    }

    const Review = ({onClick, firstName, lastName, phoneNumber, address, pokemon}) =>  (
        <div className="center-text">
            <button onClick={() => onClick("pokemonSelector")}>Back</button>
            <br /><br />
            <h3>
                Review Your Information:
            </h3>
            <br />
            <h4>
                First Name:
            </h4>
            <label>{firstName}</label>
            <br /><br />
            <h4>
                 Last Name:
            </h4>
            <label>{lastName}</label>
            <br /><br />
            <h4>
                Phone Number:
            </h4>
            <label>{phoneNumber}</label>
            <br /><br />
            <h4>
                Address:
            </h4>
            <label>{address}</label>
            <br /><br />
            <h4>
                Favourite Pokemon:
            </h4>
            <label>{pokemon}</label>
            <br /><br />
            <button onClick={() => alert("Submission successfully saved.")}>Submit</button>
        </div>
    )

    useEffect(() => {
        fetchPokemonData();
    },[url])

    useEffect(() => {
        setLoading(true)
		const filteredSearch = !search
			? allPokemonData
			: allPokemonData.filter((poke) =>
					poke.name.toLowerCase().includes(search.toLowerCase())
			  );
        setPokemonData(filteredSearch);
        setLoading(false)
	}, [search]);

    return(

        currentView === "pokemonSelector" ?
        <div className="center-text">
            <button onClick={() => onClick("form")}>Back</button>
            <br />
            <br />
            <label>
                Choose your favourite Pokemon:
            </label>
            <SearchBar setSearch={setSearch} />
            <div className="container">
                <div className="left-content">
                    <PokemonCard pokemon={pokemonData} loading={loading} infoPokemon={currentPokemon=>setPokedex(currentPokemon)}/>
                </div>
                <div className="right-content">
                <PokemonInfo data={pokedex}/>
                </div>
            </div>
        </div>
        :
        <Review onClick={page => setCurrentView(page)} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} address={address} pokemon={pokedex.name}/>

    );
}
export default PokemonSelector;