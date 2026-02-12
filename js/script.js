
const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

// DEFAULT: Sening profiling
getUser("SUNNATILLA-DEV");

async function getUser(username) {
    try {
        const res = await fetch(API_URL + username);
        const data = await res.json();

        if (data.message === "Not Found") {
            result.innerHTML = `<h2 style="color:white;">User not found</h2>`;
            return;
        }

        createUser(data);
    } catch (err) {
        result.innerHTML = `<h2 style="color:white;">Error loading user</h2>`;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value.trim();

    if (user) {
        getUser(user);
        search.value = "";
    }
});

function createUser(user) {

    const twitter = user.twitter_username 
        ? `<a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username}</a>`
        : "Not Available";

    const blog = user.blog
        ? `<a class="blog" href="${user.blog.startsWith("http") ? user.blog : "https://" + user.blog}" target="_blank">${user.blog}</a>`
        : "Not Available";

    const company = user.company 
        ? user.company 
        : "Not Available";

    const location = user.location 
        ? user.location 
        : "Not Available";

    const cardHTML = `
        <div class="card">
            <img class="user-img" src="${user.avatar_url}" alt="${user.name}" />
            <div class="user-info">
                <h2 class="name">${user.name || "No Name"}</h2>
                <h3 class="login">
                    <a href="https://github.com/${user.login}" target="_blank" style="color:#2783fa; text-decoration:none;">
                        @${user.login}
                    </a>
                </h3>
                <p class="bio">${user.bio || "No bio available"}</p>

                <ul class="followers">
                    <li><strong>Followers</strong><br/>${user.followers}</li>
                    <li><strong>Following</strong><br/>${user.following}</li>
                    <li><strong>Repos</strong><br/>${user.public_repos}</li>
                </ul>

                <ul class="user-links">
                    <li>🐦 ${twitter}</li>
                    <li>📍 ${location}</li>
                    <li>🔗 ${blog}</li>
                    <li>🏢 ${company}</li>
                </ul>
            </div>
        </div>
    `;

    result.innerHTML = cardHTML;
}
window.addEventListener("load", () => {
    setTimeout(() => {
        const ad = document.getElementById("adWrapper");
        if(ad){
            ad.classList.add("show");
        }
    }, 2500);
});
