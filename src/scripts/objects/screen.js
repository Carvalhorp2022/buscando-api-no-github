const screen = {
    userProfile:  document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                            <img src= "${user.avatarUrl} alt= "Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? "Não tem nome cadastrado 😥"}</h1>
                                <p>${user.bio ?? "Não possui BIO cadastrada 😒"}</p>

                                <br>
                                <br>
                                <div class="number">
                                
                                <p> 👥Número de seguidores: ${user.followers} </p>
                                <p> 👥Número de pessoas seguidas: ${user.following} </p>
                    
                                </div>
                                
                                
                        </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} 
                                                                    <div class="repo-icons">
                                                                    <div>🍴${repo.forks_count}</div>
                                                                    <div>🌟${repo.stargazers_count}</div>
                                                                    <div>👀${repo.watchers_count}</div>
                                                                    <div>👩‍💻${repo.language}</div>
                                                                    </div>
                                                                </a>
                                                                </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                          </div>`
        }

        let eventsItens = "";
        user.events.forEach(events => {
            if(events.type === "PushEvent" && events.payload.commits.length > 0){
                const commitsMessage = events.payload.commits[0]?.message || "Sem mensagem de commit"
                eventsItens += `<li>
                                  <div class="event-title">${events.repo.name} ➡️
                                  </div>${commitsMessage}
                                </li>`
            }else if(events.type === "CreateEvent"){
                eventsItens += `<li>
                                  <div class="event-title">${events.repo.name} ➡️</div> Sem mensagem de commit 
                                </li>`
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Últimos Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado😲! Pode ter ocorrido algum erro ao digitar, corrija, e tente novamente por favor😊</h3>"
    }
}
export{ screen }