
import { getUser } from "./services/user.js" 
import { getRepositories } from "./services/repositories.js" 
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById("btn-search").addEventListener("click", ()=>{
    const userName = document.getElementById("input-search").value
    if(validadeEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById("input-search").addEventListener("keyup", (event)=>{
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validadeEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validadeEmptyInput(userName){
    if(userName.length === 0){
        alert("Campo OBRIGATÓRIO, por favor preencha com o nome de um usuário do GitHub")
        return true
    }
}
    
async function getUserData(userName){
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
     
 }