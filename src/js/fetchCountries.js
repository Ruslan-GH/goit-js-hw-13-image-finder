import debounce from 'lodash.debounce';
import countriesCard from '../templates/countries-card.hbs'
import countryCardTpl from '../templates/country-card.hbs'

import { alert, Stack } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const refs = {
    countriesContainer: document.querySelector('.js-countries-container'),
    countryContainer: document.querySelector('.js-country-container'),
    input: document.querySelector('.input'),
}

refs.input.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
    
    const searchQuery = e.target.value;

    fetchCountry(searchQuery)
        .then(response => {
            // console.log(response.length)
          if (response.length > 10) { alertNotify() }
          else if (response.length > 2 && response.length < 10) { renderCountriesCard(response) }
          else if (response.length === 1) { renderCountryCard(response), renderCountriesCard() }
        })
        // .catch(onFetchError);

}
function alertNotify() {
  const stack = new Stack({
                delay: 1000,
                dir1: "up", 
                firstpos1: null, 
                push: "top", 
                modal: true, 
                overlayClose: true, 
                context: document.body 
            });
              alert({
                title: "Attention please ☝️",
                text: "Too many matches found. Please enter a more specific query!",
                width: "auto",
                type: ["notice", "info", "success", "error"][
                  Math.floor(Math.random() * 3.9999)
                ],
                stack: stack
              })
}

function fetchCountry(countryName) {
    return fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(result => { return result.json() });
}

function renderCountriesCard(countries) {
    const markup = countriesCard(countries);
    refs.countriesContainer.innerHTML = markup;
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.countryContainer.innerHTML = markup;
}

function onFetchError(error) {
    alert('Please try again later')
}