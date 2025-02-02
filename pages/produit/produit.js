const tabData = JSON.parse(localStorage.getItem('Les Produits')) || []


const produitAjouter = JSON.parse(localStorage.getItem('Tableau Produit')) || []

produitAjouter.forEach((el) => {
    tabData.push(el)
})


localStorage.setItem('Les Produits', JSON.stringify(tabData))

const lesProduits = document.querySelector('.lesProduits')
const lepanier = document.querySelector('#lepanier')


tabData.forEach((el) => {
    const divProduit = document.createElement('div')
    divProduit.classList.add('produits')
    divProduit.innerHTML = `
                    <div class="image">
                        <img src="${el.image}" alt="">
                    </div>
                    <div class="nomPrix">
                        <h4>${el.name}</h4>
                        <h5 class="prix">Prix: <span class="leprix">${el.prix}</span><span>fr</span></h5>
                    </div>
                    <button><i class="fa-solid fa-plus"></i><span>Ajouter</span></button>`
    lesProduits.appendChild(divProduit)
})