// console.log('connected');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Optionally close the menu when clicking outside of it
window.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add('hidden');
  }
});
// Fetch and show all categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));
};

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => displayAllPets(data.pets))
    .catch(error => console.log(error));
};

// Display all pets in cards
const displayAllPets = (pets) => {

  const petsContainer = document.getElementById("left-cards");
  petsContainer.innerHTML = "";

  if (pets.length > 0) {
    pets.forEach(pet => {
      const card = document.createElement("div");
      card.classList = " border-2 border-slate-200 w-[280px] lg:w-[300px] bg-base-100 rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 shadow-xl";
      card.innerHTML = `
      <figure class="p-6 mx-auto">
        <img src=${pet.image} class="rounded-lg w-[272px] h-[160px]" />
      </figure>
      <div class="px-6 items-start">
        <h2 class="font-bold pb-2 text-xl">${pet.pet_name || "Unknown"}</h2>
        <div class="flex items-center gap-2">
          <img class="h-4 " src="./images/Frame.png"/>
          <p>Breed: ${pet.breed || "Unknown"}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="h-4 " src="./images/file.png"/>
          <p>Birth: ${pet.date_of_birth || "Unknown"}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="h-4 " src="./images/br.png"/>
          <p>Gender: ${pet.gender || "Unknown"}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="h-4 " src="./images/s.png"/>
          <p>Price: ${pet.price ? `$${pet.price}` : "Not Available"}</p>
        </div>
        <hr class="border-2 border-gray-200 w-[250px] my-4" />
      </div>
      <div class="card-actions lg:mx-4 justify-around pb-6 flex ">
        <div>
        <button class="btn border-1 border-slate-400" onclick="likePet('${pet.image}')"><img src="./images/th.png"/></button>
        </div>

        <div>
        <button id="ad_btn" class="btn border-1 border-slate-400 text-lg text-[#0E7A81]" onclick="adoptPet('${pet.pet_name}')">Adopt</button>
        </div>

        <div>
        <button class="btn border-1 border-slate-400 text-lg text-[#0E7A81]" onclick="showDetails('${pet.petId}')">Details</button>
        </div>
      </div>
    `;
      // likedContainer.classList.remove("hidden")
      petsContainer.appendChild(card);
    })

  }
  else if (pets.length == 0) {

    const card = document.createElement("div");
    card.innerHTML = `
     <div class="w-[285px] md:w-[500px] lg:w-[800px] h-[491px] rounded-lg flex flex-col items-center justify-center  bg-gray-300">
       <div class="  md:p-6  w-full text-center">
          <img src="./images/error.png" alt="No Information" class=" mx-auto mb-6">
          <h2 class=" text-2xl font-bold ">No Information Available</h2>
          <p class="text-gray-600 w-5/6 md:w-2/3 mx-auto my-6">
          If there is no available data on the selected pet, we encourage you to explore our diverse range of pets and categories. Each pet has a unique story, and we believe that every pet deserves a loving home.


          </p>
       </div>
     </div>

     `

    petsContainer.appendChild(card);
  }
};

const likedContainer = document.getElementById("right-cards");

// right side display
const likePet = (image) => {
  const likedContainer = document.getElementById("right-cards");
  const likedPet = document.createElement("div");

  likedPet.classList = " p-2 max-w-[200px]  object-cover";
  likedPet.innerHTML = `<img src="${image}" class="rounded-lg w-30 lg:w-[170px]" />`;
  likedContainer.appendChild(likedPet);
};

//modal for adopt button
const adoptPet = (petName) => {
  const adoptContainer = document.getElementById("modal-content2");
  const adoptBtn = document.getElementById("showModalData2");
  const modal = document.getElementById("customModal2");
  const buttonToDisable = document.querySelector(`button[onclick="adoptPet('${petName}')"]`);

  let countdown = 3;

  adoptContainer.innerHTML = `
  <div class="flex justify-center"><img  src="./images/handshake.png"/></div>
  <h3 class="text-3xl py-4 font-bold text-center">Congrates!</h3>
  <p class="py-4 text-center">Adopting ${petName} in </p>
  <h3 id="countdown" class="text-3xl py-4 font-bold text-center">${countdown}</h3>
  `;

  // Show the modal
  adoptBtn.classList.remove("hidden");
  modal.showModal();
  buttonToDisable.disabled = true;

  const countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").textContent = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      modal.close();
      adoptBtn.classList.add("hidden");
    }
  }, 1000);


  buttonToDisable.textContent = "Adopted";

};

// detail modal

const displayDetails = (petData) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
    <figure class="mx-auto h-[200px] md:h-[230px]  overflow-hidden">
        <img src="${petData.image}" class="rounded-lg  w-full  object-contain" />
    </figure>
    <div class="px-2 items-start">
        <h2 class="font-bold pb-2 text-xl">${petData.pet_name || "Unknown"}</h2>
        <div class="grid grid-cols-2">
            <div class="flex items-center gap-2">
                <img class="h-4 " src="./images/Frame.png"/>
                <p class="text-sm">Breed: ${petData.breed || "Unknown"}</p>
            </div>
            <div class="flex items-center gap-2">
                <img class="h-4 " src="./images/file.png"/>
                <p class="text-sm">Birth: ${petData.date_of_birth || "Unknown"}</p>
            </div>
            <div class="flex items-center gap-2">
                <img class="h-4 " src="./images/br.png"/>
                <p class="text-sm">Gender: ${petData.gender || "Unknown"}</p>
            </div>
            <div class="flex items-center gap-2">
                <img class="h-4 " src="./images/s.png"/>
                <p class="text-sm">Price: ${petData.price ? `$${petData.price}` : "Not Available"}</p>
            </div>
            <div class="flex items-center gap-2">
                <img class="h-4 " src="./images/v.png"/>
                <p class="text-sm">Vaccinated Status: ${petData.vaccinated_status ? `${petData.vaccinated_status}` : "Not Available"}</p>
            </div>
        </div>
        <hr class="border-2 border-gray-200 w-full my-3" />
    </div>
    <div class="px-2 ">
        <h2 class="font-bold mb-2">Details Information</h2>
        <p class="w-[374px] md:w-[452px] text-xs ">${petData.pet_details}</p>
    </div>
  `;
  document.getElementById("customModal").showModal();
};

// modal for the pet details

document.getElementById('cancelModal').addEventListener('click', function (event) {
  event.preventDefault();  // Prevent default form submission behavior
  document.getElementById('customModal').close();  // Close the modal
});

const showDetails = (petId) => {

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res => res.json())
    .then(pet => {
      displayDetails(pet.petData)
      document.getElementById('customModal').showModal();

    })
    .catch(error => console.log(error));
};

// Display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach(category => {
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
      <button id="${category.category}" onclick="loadPetsByCategory('${category.category}')"
        class="bg-white  w-[280px] border-2 gap-3 border-slate-200 text-xl text-black font-bold p-4 rounded-lg flex items-center justify-center">
        <img class="w-10 h-10" src="${category.category_icon}"/>
        <span>${category.category}</span>
      </button>
    `;

    categoryContainer.appendChild(buttonContainer);
  });

};
// Load by category

const loadPetsByCategory = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {

      // delay

        displayAllPets(data.data);
      CategoryBtnHandler(data.data);
    })
    .catch(error => console.log(error));

};
const CategoryBtnHandler = (pets) => {
  const btnCat = document.getElementById("Cat");
  const btnDog = document.getElementById("Dog");
  const btnBird = document.getElementById("Bird");
  const btnRabbit = document.getElementById("Rabbit");
  const petSection = document.getElementById("pet-section");
  const spinner = document.getElementById("spinner");
  petSection.classList.add('hidden')
  spinner.classList.remove('hidden')
// spinner
  setTimeout(() => {
    petSection.classList.remove('hidden')
    spinner.classList.add('hidden')
  },2000)


  btnCat && btnCat.classList.remove("bg-teal-100", 'border-teal-200', 'rounded-full')
  btnDog && btnDog.classList.remove("bg-teal-100", 'border-teal-200', 'rounded-full')
  btnBird && btnBird.classList.remove("bg-teal-100", 'border-teal-200', 'rounded-full')
  btnRabbit && btnRabbit.classList.remove("bg-teal-100", 'border-teal-200', 'rounded-full')

  btnCat && btnCat.classList.add('rounded-lg');
  btnDog && btnDog.classList.add('rounded-lg');
  btnBird && btnBird.classList.add('rounded-lg');
  btnRabbit && btnRabbit.classList.add('rounded-lg');

  if (pets.length) {
    const btn = document.getElementById(pets[0].category);
    btn && btn.classList.remove( 'rounded-lg')
    btn && btn.classList.add('bg-teal-100', 'border-teal-200', 'rounded-full')
  }
  else {
    btnBird && btnBird.classList.remove('rounded-lg')
    btnBird && btnBird.classList.add('bg-teal-100', 'border-teal-200', 'rounded-full')
  }
}

// price sort
document.getElementById('sortByPrice').addEventListener('click', () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => {
      const sortedPets = data.pets.sort((a, b) => b.price - a.price);
      displayAllPets(sortedPets);
    })
    .catch(error => console.log(error));
});

// footer input clear
document.getElementById('clearBtn').addEventListener('click', function () {
  document.getElementById('inputBox').value = ''; // Clear the input field
});

loadCategories();
loadAllPets();
