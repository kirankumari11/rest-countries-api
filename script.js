const countryContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')

let allCountriesData = []

// Get all countries
fetch('https://api-backend-0gx1.onrender.com/api/countries')
    .then((res) => res.json())
    .then((data) => {
        allCountriesData = data.data.objects
        console.log(allCountriesData)
        renderCountries(allCountriesData)
    })
    .catch((error) => {
        console.error('Error fetching countries:', error)
    })

// Search
searchInput.addEventListener('input', (e) => {

    const searchValue = e.target.value.toLowerCase()

    const filteredCountries = allCountriesData.filter((country) => {
        return country.names.common
            .toLowerCase()
            .includes(searchValue)
    })

    renderCountries(filteredCountries)
})


// Filter by region
filterByRegion.addEventListener('change', () => {

    fetch(`https://api-backend-0gx1.onrender.com/api/countries/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data.data.objects)
        })
        .catch((error) => {
            console.error('Error fetching countries by region:', error)
        })
})


// Render countries
function renderCountries(countries) {

    countryContainer.innerHTML = ''

    countries.forEach((country) => {

        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `./country.html?name=${encodeURIComponent(country.names.common)}`

        // Flag
        const flagHTML = country.flag?.url_svg
            ? `<img src="${country.flag.url_svg}" alt="${country.names.common}">`
            : `<div class="no-flag">No flag found</div>`

        // Card
        countryCard.innerHTML = `
            ${flagHTML}

            <div class="card-text">
                <h3 class="card-title">
                    ${country.names.common}
                </h3>
                <p>
                    <b>Population: </b>
                    ${country.population.toLocaleString('en-IN')}
                </p>
                <p>
                    <b>Region: </b>
                    ${country.region}
                </p>
                <p>
                    <b>Capital: </b>
                    ${country.capitals.map((capital)=> capital.name).join(", ") || 'N/A'}
                </p>
            </div>
        `

        countryContainer.append(countryCard)
    })
}
