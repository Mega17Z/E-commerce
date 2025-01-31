const recupenumPanier = JSON.parse(localStorage.getItem('lepanier'))

const recupeTableau = JSON.parse(localStorage.getItem('tableauProduit'))
console.log(recupeTableau)

const lepanier = document.getElementById('lepanier')
lepanier.innerText = recupenumPanier

const conteneurElements = document.querySelector('.lePanier')
const TotalTout = document.querySelector('.AllTotal span')

let TotaldeTout = 0


recupeTableau.forEach((element) => {
    let quantite = 1
    let letotal = element.prix
    // const b = URL.createObjectURL(element.files[0])
    const divPanier = document.createElement('div')
    divPanier.classList.add('panier')
    divPanier.innerHTML = `
                        <div class="bloc-info">
                        <div class="panier-image">
                            <img src="${element.image}" alt="">
                        </div>
                        <div class="panier-info">
                            <h4>${element.name}</h4>
                            <h5 class="prix">Prix: <span class="leprix">${element.prix}</span><span>fr</span></h5>
                        </div>
                    </div>
                    <div class="Plusprix">
                        <div class="NonmbrePlus">
                            <i class="fa-solid fa-minus"></i>
                            <p>0</p>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div class="totalPrix">
                            <span>0</span>
                        </div>
                    </div>
    `
    conteneurElements.appendChild(divPanier)


    const buttonMoins = divPanier.querySelector('.fa-minus')
    const buttonplus = divPanier.querySelector('.fa-plus')
    const laQuantite = divPanier.querySelector('p')
    laQuantite.textContent = quantite
    const totalProduit = divPanier.querySelector('.totalPrix span')
    totalProduit.textContent = letotal

    buttonMoins.addEventListener('click', () =>{
        let lenombre = parseInt(laQuantite.textContent)

        if(lenombre > 1){
            lenombre = lenombre - 1
            laQuantite.textContent = lenombre

            // appelle de la fonction
            calculPrix()
        }
    })

    buttonplus.addEventListener('click', () =>{
        let lenombre = parseInt(laQuantite.textContent)

        lenombre = lenombre + 1
        laQuantite.textContent = lenombre

        // appeller de la fonction
        calculPrix()
    })

    function calculPrix() {
        const lenombre = parseInt(laQuantite.textContent)
        
        const totalduPrix = lenombre * element.prix
        totalProduit.textContent = totalduPrix
        calculLeTout()
    }


});

function calculLeTout(){
    TotaldeTout = 0

    const lesTotalProduit = document.querySelectorAll('.totalPrix span')

    lesTotalProduit.forEach(prix => {
        TotaldeTout = TotaldeTout + parseFloat(prix.textContent)

        TotalTout.textContent = TotaldeTout
    })
}

calculLeTout()

const valideButton = document.querySelector('.AllTotal button')

valideButton.addEventListener('click', () => {
    const tableauValider = []

    const lesPaniers = document.querySelectorAll('.panier')

    lesPaniers.forEach((element) => {
        const nomProduit = element.querySelector('h4')
        if(nomProduit){
           const nomduProduit = nomProduit.textContent
           const sonprix = element.querySelector('.leprix').textContent
           const saquantite = element.querySelector('p').textContent
           const saTotal = element.querySelector('.totalPrix span').textContent
   
           const leValide = {
               nom: nomduProduit,
               prix: sonprix,
               quantite: saquantite,
               total: saTotal,
               leTout: TotalTout.textContent
           }
           tableauValider.push(leValide)
        }
        
    })

    // console.log(tableauValider)
    localStorage.setItem('panierValider', JSON.stringify(tableauValider))
    localStorage.removeItem('tableauProduit')
    localStorage.removeItem('lepanier')
})