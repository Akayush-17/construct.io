let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
  //Geolocation APU is used to get geographical position of a user and is available inside the navigator object
  if (navigator.geolocation) {
    //returns position(latitude and longitude) or error
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    //For old browser i.e IE
    locationDiv.innerText = "The browser does not support geolocation";
  }
});

//Error Checks
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:
      //usually fired for firefox
      locationDiv.innerText = "Location Information unavailable";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get user location timed out";
  }
};

const showLocation = async (position) => {
  //We user the NOminatim API for getting actual addres from latitude and longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
  locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};



// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.co.in/imghp?hl=en&authuser=0&ogbl${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

