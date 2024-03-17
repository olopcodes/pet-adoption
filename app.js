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
        clone.querySelector('h3').textContent = pet.name;
        wrapper.appendChild(clone);
        console.log(pet.name)
    });

    document.querySelector('.list-of-pets').appendChild(wrapper);
}

petsArea();