/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.getElementsByClassName("cards").item(0);
const baseURL = "https://api.github.com/users/debauchery1st";

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
  const gitHacker = document.createElement('a')
  // assign
  gitHacker.href = `javascript:loadHacker('https://api.github.com/users/${ghCard.login}')`;
  gitHacker.textContent = "💾";
  gitHacker.display = "flex";
  gitHacker.classList.add('load-hacker');
  gitCard.classList.add("card");
  gitImg.src = ghCard.avatar_url;
  gitCardInfo.classList.add("card-info");
  gitName.classList.add("name");
  gitName.textContent = ghCard.name;
  gitUserName.classList.add("username");
  gitUserName.textContent = ghCard.login;
  gitLocation.textContent = `Location: ${(ghCard.location == null) ? "Lambda School":ghCard.location}`;
  gitProfileURL.href = ghCard.html_url;
  gitProfileURL.target = "_blank";
  gitProfileURL.textContent = "visit my profile";
  gitProfile.textContent = "Profile: ";
  gitProfile.appendChild(gitProfileURL);
  gitFollowers.textContent = (ghCard.followers != null) ? `Followers: ${(ghCard.followers)}`:"";
  gitFollowing.textContent = (ghCard.followers != null) ? `Following: ${(ghCard.following)}`:"";
  gitBio.textContent = (ghCard.bio == null) ? "Bio: hacker":`Bio: ${ghCard.bio}`;
  // assemble
  gitProfile.appendChild(gitProfileURL);
  gitName.appendChild(gitHacker);
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

function populateCards(url=baseURL, follow=true, create=true) {
  if (url.length === 0) {
    console.log("url?")
    return true;
  }
  return new axios.get(url)
    .then(a => {
      if (create) {
        cards.appendChild(createHTMLCard(a.data));
      }
      return a;
    }).then(b => {
      if (follow) {
        populateCards(b.data.followers_url, false, false);
      }
      return b;
    }).then(c => {
      if (!create && c.data.length > 0) {
        c.data.forEach((hck) => followersArray.push(hck.login));
      }
      return c;
    }).then((result) => {
      if (result.data.length > 0) {
        followersArray.forEach((hacker)=>{
          populateCards(`https://api.github.com/users/${hacker}`, false, true);
        })
      }
      return result;
    });
}

function loadHacker(hackerURL) {
  while (followersArray.length > 0) {
    followersArray.pop();
  }
  return new Promise(()=>{
    cards.innerHTML = "";
    cards.textContent = "";
    console.log(cards);
  }).then(populateCards(hackerURL));
}

var hackersPromise = populateCards().catch((e) => console.log(`failed to resolve promise; ${e}`));
