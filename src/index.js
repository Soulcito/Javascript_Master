'use strict'

// DECLARACIÓN DE VARIABLES 

const inpBuscar  = document.getElementById('inp-buscar');
const btnBuscar  = document.getElementById('btn-buscar');
const consulta   = document.getElementById('consulta');
const historial  = document.getElementById('historial');
const btnClean   = document.getElementById('clean-historial');
const preLoading = document.getElementById('loading');

const URL = `https://pokeapi.co/api/v2/pokemon/`;

let listaPokemon = '';


// DECLARACION DE FUNCIONES

const pokeApi = async (pokemon) => {
   
  try {
      
    preLoading.removeAttribute('class','hidden');

    const response = await fetch(`${URL}${pokemon}`);
    const body     = await response.json();

    
    preLoading.setAttribute('class','hidden');
    
    consulta.innerHTML = `<p style="color: blue">NUMERO DE POKEMON ${body.id}<p>`;    
    listaPokemon += `<li>pokemon: ${body.name} | numero: ${body.id}</li>`;
    historial.innerHTML = listaPokemon;
    localStorage.setItem('pokemon',listaPokemon);

  } catch (error) {    
    consulta.innerHTML = `<p style="color: red">${error}<p>`;
  } finally {
    limpiar();    
  }
}

const valida = () => {

  const value = inpBuscar.value;
  consulta.innerHTML = '';

   if ( value === '' ) {
      consulta.innerHTML = `<p style="color: red">DEBE INGRESAR POKEMON<p>`;
      limpiar();
   }else {
     pokeApi(value);     
   }
}

const limpiar = () => {
  inpBuscar.value = '';
  inpBuscar.focus();   
  preLoading.setAttribute('class','hidden');
}

const cleanHistorial = () => {
  localStorage.removeItem('pokemon');
  historial.innerHTML = '';
}

// MAIN

window.addEventListener('DOMContentLoaded', () => {
    const getHistorial = localStorage.getItem('pokemon');
    historial.innerHTML = getHistorial;
});

btnBuscar.addEventListener('click', valida);

btnClean.addEventListener('click', cleanHistorial);

