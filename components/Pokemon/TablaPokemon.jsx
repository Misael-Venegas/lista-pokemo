import React, { useState } from 'react'

const TablaPokemon = ({ listaPokemon, setListaPokemon, setListaAuxiliarPokemon}) => {

    const eliminarPokemon = (id) => {
        const arrayAuxiliar = listaPokemon.filter(e => {
            return e.id != id
        })
        setListaPokemon(arrayAuxiliar)
        setListaAuxiliarPokemon(arrayAuxiliar)
        
    }

    return (
        <table border={1} style={{ width: "100%", textAlign: 'center', marginTop: "10px" }} >
            <thead>
                <tr>
                    <th colSpan={4} >Datos del pokemon</th>
                    <th colSpan={2} >Imágenes</th>
                    <th>Eliminar</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Peso</th>
                    <th>Altura</th>
                    <th>Frontal</th>
                    <th>Trasera</th>
                    <th>X</th>
                </tr>
            </thead>

            <tbody>
                {
                    listaPokemon?.map((pokemon, key) => {
                        console.log(pokemon)
                        return <tr key={key} >
                            <td>{pokemon.id}</td>
                            <td>{pokemon.name}</td>
                            <td>{pokemon.peso} kg. </td>
                            <td> {pokemon.altura} mts.</td>
                            <td> <img src={pokemon.img_front} alt="font_image" /> </td>
                            <td> <img src={pokemon.img_back} alt="back_image" /> </td>
                            <td> <span className='seleccionarComponente' onClick={() => eliminarPokemon(pokemon.id)} >quitar</span> </td>
                        </tr>
                    })
                }
            </tbody>

        </table>

    )
}

export default TablaPokemon