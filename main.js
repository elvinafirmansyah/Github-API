const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const submit = document.querySelector('submit');

getUser("elvinafirmansyah");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
      <div class="card-user bg-glass p-6 gap-x-5 flex justify-center items-start  rounded-xl mt-4 text-white">
        <img src=${user.avatar_url} width="100" height="100" class="rounded-full border-4 border-solid border-orange-400" alt="${user.name}"/>
        <div class="flex flex-col gap-y-1">
          <h2 class="font-black text-2xl">${user.name}<h2>
          <p class=${user.bio ? "" : "hidden"}>${user.bio ? user.bio : ""}<h2>
          <a href=${user.blog} class="underline text-orange-500" target="_blank">${user.blog}</a>
          <div class="flex justify-between gap-x-3 mt-3">
            <div class="text-center bg-glass p-4 rounded-xl">
              <h5 class="text-white font-black text-[25px]">${user.followers}</h5>
              <p>Followers</p>
            </div>
            <div class="text-center bg-glass p-4 rounded-xl">
              <h5 class="text-white font-black text-[25px]">${user.following}</h5>
              <p>Following</p>
            </div>
            <div class="text-center bg-glass p-4 rounded-xl">
              <h5 class="text-white text-[25px] font-black text-[25px]"><a class="text-decoration-none" target="_blank" href="${user.html_url}?tab=repositories">${user.public_repos}</a></h5>
              <p class="">Repos</p>
            </div>
          </div>
        </div>
      </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});

submit.addEventListener ('click', () => {
  getUser(user);

  search.value = '';
})