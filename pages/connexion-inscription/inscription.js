const tabProfil = JSON.parse(localStorage.getItem('les utilisateurs')) || []

const prenom = document.getElementById('firstname')
const nom = document.getElementById('lastname')
const email = document.getElementById('email')
const motdepasse = document.getElementById('password')

const buttInscript = document.getElementById('inscripte')

buttInscript.addEventListener('click', (e) => {
    e.preventDefault()

    const valPrenom = prenom.value
    const valNom = nom.value
    const valEmail = email.value
    const valPass = motdepasse.value

    if(valPrenom == "" || valNom == "" || valEmail == "" || valPass == ""){
        return
    }

    const profil = {
        nom: valPrenom + ' ' + valNom,
        mail: valEmail,
        pass: valPass 
    }

    tabProfil.push(profil)

    console.log(profil)
    console.log(tabProfil)

    localStorage.setItem('les utilisateurs', JSON.stringify(tabProfil))

    prenom.value = ""
    nom.value = ""
    email.value = ""
    motdepasse.value = ""

    window.location.href = '../clients/client.html'
})