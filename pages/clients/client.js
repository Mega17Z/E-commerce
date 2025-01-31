const tabData = [
    {
        image: '1.png',
        name: 'Machine',
        prix: 120000
    },
    {
        image: '2.png',
        name: 'Tablette',
        prix: 70000
    },
    {
        image: '3.png',
        name: 'Casque',
        prix: 10000
    }
]


const lesProduits = document.querySelector('.lesProduits')
const lepanier = document.querySelector('#lepanier')
const produitAjouter = []


tabData.forEach((el, index) => {
    const divProduit = document.createElement('div')
    divProduit.classList.add('produits')
    divProduit.innerHTML = `
                    <div class="image">
                        <img src="image/${el.image}" alt="">
                    </div>
                    <div class="nomPrix">
                        <h4>${el.name}</h4>
                        <h5 class="prix">Prix: <span class="leprix">${el.prix}</span><span>fr</span></h5>
                    </div>
                    <button onclick="ajoutPanier(${index})"><i class="fa-solid fa-plus"></i><span>Ajouter</span></button>`
    lesProduits.appendChild(divProduit)
})

function ajoutPanier(index){
    if(!produitAjouter.includes(tabData[index])){
        produitAjouter.push(tabData[index])
        console.log(produitAjouter)
        const b = parseInt(lepanier.textContent) 
        lepanier.textContent = b + 1
    }else{
        console.log('produit deja ajouter')
    }
    donnerProduit()
}

function donnerProduit(){
    localStorage.setItem('tableauProduit', JSON.stringify(produitAjouter))
    localStorage.setItem('lepanier', JSON.stringify(lepanier.textContent))
}

(function recupeProduit(){
    const panier = JSON.parse(localStorage.getItem('lepanier')) || 0
    lepanier.textContent = panier
})()