const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();

async function getData() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
    const weatherData = await weatherPromise.json();
    console.log(weatherData.properties.periods[0]);
    const temperature = weatherData.properties.periods[0].temperature;
    document.querySelector('#temperature-output').textContent = temperature
}

getData();

async function petsArea() {
    const petsPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json');
    const petsData = await petsPromise.json();
    petsData.forEach((pet) => {
        // cloning a template
        const clone = template.content.cloneNode(true);
        clone.querySelector('.pet-card').dataset.species = pet.species;
        clone.querySelector('h3').textContent = pet.name;
        clone.querySelector('.pet-description').textContent = pet.description;
        clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear);

        if (!pet.photo) pet.photo = 'images/fallback.jpg';

        clone.querySelector('.pet-card-photo img').src = pet.photo;
        clone.querySelector('.pet-card-photo img').alt = `A ${pet.species} named ${pet.name}`
        wrapper.appendChild(clone);
    });

    document.querySelector('.list-of-pets').appendChild(wrapper);
}

petsArea();

function createAgeText(birthYear) {
    // age will be different because video was recorded in 2023

    // get current year
    const currentYear = new Date().getFullYear();
    // get age
    const age = currentYear - birthYear;

    // using type coersion with double equal
    if (age == 1) return '1 year old'
    if (age == 0) return `Less than a year old`

    return `${age} years old`
}

// pet filter area =============
const allButtons = document.querySelectorAll('.pet-filter button');

allButtons.forEach(el => {
    el.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
    // remove active class
    allButtons.forEach(el => el.classList.remove('active'));

    // add active to button clicked
    e.target.classList.add('active');

    // filter
    // when added a data attribute you can use dataset.nameOfProperty
    const currentFilter = e.target.dataset.filter;
    document.querySelectorAll('.pet-card').forEach(el => {
        if (
            currentFilter === el.dataset.species ||
            currentFilter === 'all'
        ) {
            el.style.display = 'grid';
        } else {
            el.style.display = 'none';
        }
    });

}