/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.getElementsByClassName("cards").item(0);
const baseURL = "https://api.github.com/users/debauchery1st";

// const populateCards = (resp) => cards.appendChild(createHTMLCard(JSON.parse(resp)));
// function notAxios(url, foo) {
//   const theStateOf = {
//     "UNSENT": 0,
//     "OPENED": 1,
//     "HEADERS_RECEIVED": 2,
//     "LOADING": 3,
//     "DONE": 4
//   };
//   const xhr = new XMLHttpRequest();
//   const processRequest = (e) => {
//     if (xhr.readyState === theStateOf["DONE"] && xhr.status == 200) {
//       console.log("OK");
//       foo(xhr.response);
//     }
//   }
//   // xhr.open(HTTP_METHOD, URL, ASYNC?)
//   xhr.open('GET', url, true);
//   xhr.addEventListener("readystatechange", processRequest, false);
//   xhr.send();
// }
// notAxios("https://api.github.com/users/debauchery1st", populateCards);


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

// const populateFollowers = (resp) => {
//   var peeps = JSON.parse(resp);
//   peeps.forEach((peep, num) => followersArray.push(peep));
//   followersArray.forEach((peep) => cards.appendChild(createHTMLCard(peep)));
// }
// notAxios("https://api.github.com/users/debauchery1st/followers", populateFollowers);


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createHTMLCard(ghCard) {
  // create
  const gitCard = document.createElement("div");
  const gitImg = document.createElement("img");
  const gitCardInfo = document.createElement("div");
  const gitName = document.createElement("h3");
  const gitUserName = document.createElement("p");
  const gitLocation = document.createElement("p");
  const gitProfile = document.createElement("p");
  const gitProfileURL = document.createElement("a");
  const gitFollowers = document.createElement("p");
  const gitFollowing = document.createElement("p");
  const gitBio = document.createElement("p");
  // assign
  gitCard.classList.add("card");
  gitImg.src = ghCard.avatar_url;
  gitCardInfo.classList.add("card-info");
  gitName.classList.add("name");
  gitName.textContent = (ghCard.name === "debauchery1st") ? "Trevor Martin":ghCard.name;
  gitUserName.classList.add("username");
  gitUserName.textContent = ghCard.login;
  gitLocation.textContent = `Location: ${(ghCard.location == null) ? "Lambda School":ghCard.location}`;
  gitProfileURL.href = ghCard.html_url;
  gitProfileURL.textContent = "visit my profile";
  gitProfile.textContent = "Profile: ";
  gitProfile.appendChild(gitProfileURL);
  gitFollowers.textContent = `Followers: ${ghCard.followers}`;
  gitFollowing.textContent = `Following: ${ghCard.following}`;
  gitBio.textContent = (ghCard.bio == null) ? "":ghCard.bio;
  // assemble
  gitProfile.appendChild(gitProfileURL);
  gitCardInfo.appendChild(gitName);
  gitCardInfo.appendChild(gitUserName);
  gitCardInfo.appendChild(gitLocation);
  gitCardInfo.appendChild(gitProfile);
  gitCardInfo.appendChild(gitFollowers);
  gitCardInfo.appendChild(gitFollowing);
  gitCardInfo.appendChild(gitBio);
  gitCard.appendChild(gitImg);
  gitCard.appendChild(gitCardInfo);
  return gitCard;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const populateCards = (resp) => cards.appendChild(createHTMLCard(resp.data));
// const populateFollowers = (resp) => resp.forEach(peep => cards.appendChild(createHTMLCard(peep)));
const populateFollowers = (peeps) => {
  peeps.forEach((peep) => followersArray.push(peep));
  followersArray.forEach((peep) => cards.appendChild(createHTMLCard(peep)));
}

axios.get(baseURL).then(response => cards.appendChild(createHTMLCard(response.data))).then(axios.get(`${baseURL}/followers`).then(response => populateFollowers(response.data)));
