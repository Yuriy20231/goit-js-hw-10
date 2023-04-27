import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';



const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list')
const li = list.getElementsByTagName('li')



input.addEventListener('input',debounce(formInput,DEBOUNCE_DELAY))

function formInput(e) {

  if (e.target.value.length !== 0) {

    const promise = new Promise((resolve) => {

      resolve(fetchCountries(e.target.value.trim()))
    });
    promise.then(value => {

      const filterArr = value.filter(item => item)


      const renderOne = filterArr.map((item) => {

        if (value.length == 1) {


          let language = ''
          for (let lg in item.languages) {
            language += item.languages[lg] + ","
          }
          return `<li class='onepost' style='list-style-type: none;' id='onepost'>
<img src='${item.flags.svg}' alt='${item.flags.alt}' style='width: 30px;height: 15px; margin-right: 15px'>
<strong>${item.name.official}</strong>
<div><strong>Capital:</strong> ${item.capital}</div>
<div><strong>Population:</strong> ${item.population}</div>
<div><strong>Languages:</strong> ${language}</div>
</li>`;
        } else if (value.length <= 10 && value.length >= 2) {


          return `<li class='manypost' style='list-style-type: none;' id='manypost'>
<img src='${item.flags.svg}' alt='${item.flags.alt}' style='width: 30px;height: 15px; margin-right: 15px'>
${item.name.official}
</li>`;
        }
      }).join('');
      list.innerHTML = renderOne;

    })

  }
  else{
    list.innerHTML=''
  }

}
