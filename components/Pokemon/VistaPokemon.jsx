'use client'
import React, { useState, useEffect } from 'react'
import TablaPokemon from './TablaPokemon'

const VistaPokemon = () => {

    const [listaPokeom, setlistaPokeom] = useState([])
    const [arrayAuxiliar, setArrayAuxiliar] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        obtnerListaPokemo()
    }, [])

    const obtnerListaPokemo = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');

            if (!response.ok) {
                throw new Error("Error al intentar crear la peticion")
            }

            const data = await response.json();

            const pokemonConDettalles = await Promise.all(

                data.results.map(async (item) => {
                    const informacionAdicional = await obtnerInformacionAdicional(item.url)
                    return {
                        ...item,
                        id: informacionAdicional.id,
                        peso: informacionAdicional.weight,
                        altura: informacionAdicional.height,
                        img_front: informacionAdicional.sprites.back_default,
                        img_back: informacionAdicional.sprites.front_default
                    }
                })
            )

            setlistaPokeom(pokemonConDettalles)
            setArrayAuxiliar(pokemonConDettalles)
        } catch (error) {
            console.log(error.message)
        } finally {
            setisLoading(false)
        }
    }


    const obtnerInformacionAdicional = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al intentar obtner la infirmación adicional")
            }

            const data = await response.json()
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }

    const buscarPokemon = (nombre) => {
        if (nombre == "") {
            setlistaPokeom(arrayAuxiliar);
            return;
        }

        const arrayFiltro = listaPokeom.filter(e => {

            return e.name.toLowerCase().includes(nombre.toString().toLowerCase());
        })

        setlistaPokeom(arrayFiltro)

    }
    return (
        <>
            <span  >Buscar</span> <br />
            <input className='inputBusqueda' placeholder='Ingresa el nombre del pokemon' type="text" onChange={(e) => buscarPokemon(e.target.value)} />
            {
                isLoading ? <p>Cargando pokemons...</p> :
                    <TablaPokemon listaPokemon={listaPokeom} setListaPokemon={setlistaPokeom} setListaAuxiliarPokemon={setArrayAuxiliar} />
            }
        </>
    )
}

export default VistaPokemon