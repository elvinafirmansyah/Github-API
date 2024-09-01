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
      <div class="row">
        <div class="col">
          <div class="card-user mt-4 d-flex justify-content-center align-items-center flex-row">
            <img src="${user.avatar_url}" width="140" height="140" class="mt-2" alt="${user.name}"/>
            <div class="name-bio pt-4 ">
              <h2>${user.name}<h2>
              <p>${user.bio}</p>
              <a class="blog mb-2" href="${user.blog}" target="_blank">${user.blog}</a>
              <div class="about-card d-flex flex-row mt-2">
                <div class="d-flex mr-0">

                  <h5 ><i class="bi bi-person-hearts" style="margin-right: 5px;"></i>${user.followers}</h5>
                </div>
                <div class="d-flex  mr-2">
                  <h5><i class="bi bi-person-check-fill" style="margin-right: 5px;"></i>${user.following}</h5>
                </div>
                <div class="d-flex mr-2">
                  <h5><i class="bi bi-journal-album" style="margin-right: 5px;"></i><a class="text-decoration-none text-white" target="_blank" href="${user.html_url}?tab=repositories">${user.public_repos}</a></h5>
                </div>
              </div>
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