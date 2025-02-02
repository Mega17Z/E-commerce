const nom = document.getElementById('nom')
const email = document.getElementById('mail')
const motdePasse = document.getElementById('pass')

const ajout = document.getElementById('Ajout')
const conteneur = document.querySelector('.clients')

const tabProfil = JSON.parse(localStorage.getItem('les utilisateurs')) || []


ajout.addEventListener('click', () => {
    if(nom.value == "" || email.value == "" || motdePasse.value == ""){
        return
    }

    const lenom = nom.value
    const lemail = email.value
    const lepass = motdePasse.value

    const profil = {
        nom: lenom,
        mail: lemail,
        pass: lepass
    }

    tabProfil.push(profil)

    localStorage.setItem('les utilisateurs', JSON.stringify(tabProfil))

    const divClient = document.createElement('div')
    divClient.classList.add('client')
    divClient.innerHTML = `
                    <h3>${lenom}</h3>
                    <h4><u>Email:</u> ${lemail}</h4>
                    <p><u>Mot de Passe:</u> ${lepass}</p>
    `
    conteneur.appendChild(divClient)

    nom.value = ""
    email.value = ""
    motdePasse.value = ""
})


tabProfil.forEach(element => {
    const divClient = document.createElement('div')
    divClient.classList.add('client')
    divClient.innerHTML = `
                    <h3>${element.nom}</h3>
                    <h4><u>Email:</u> ${element.mail}</h4>
                    <p><u>Mot de Passe:</u> ${element.pass}</p>
    `
    conteneur.appendChild(divClient) 
});