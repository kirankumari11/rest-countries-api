const countryName = new URLSearchParams(location.search).get('name')

const countryImg = document.querySelector('.country-details img')
const title = document.querySelector('.details-text-container h1')
const textDetails = document.querySelector('.details-text')
const nativeName = document.querySelector(' .native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.tld')
const currency = document.querySelector('.currency')


fetch(
    `https://api-backend-0gx1.onrender.com/api/countries/name/${encodeURIComponent(countryName)}`
)
.then((res)=>res.json())
.then((data)=> {
    console.log("Country.js:", data)
    let countryData = data.data.objects[0]

    countryImg.src = countryData.flag.url_svg
    title.innerText = countryData.names.common
    if(countryData.names.native) {
        nativeName.innerText = Object.values(countryData.names.native)[0].common
    }
    population.innerText = countryData.population.toLocaleString('en-IN')
    region.innerText = countryData.region
    subRegion.innerText = countryData.subregion
    capital.innerText = countryData.capitals.map((capital)=> capital.name).join(", ")
    topLevelDomain.innerText = countryData.tlds.join(", ")
    currency.innerText = Object.values(countryData.currencies).map((currency)=> currency.name).join(", ")

    if(countryData.borders) {
        countryData.borders.forEach((border)=> {
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = border
                borderCountryTag.href = `./country.html?name=${border}`
                const borderCont = document.querySelector('.border-countries-name')
                borderCont.appendChild(borderCountryTag)

        })
    } else {
        const borderCountryTag = document.createElement('span')
        borderCountryTag.innerText = "No border countries"
        const border = document.querySelector('.border-countries-name')
        border.appendChild(borderCountryTag)
    }

})


