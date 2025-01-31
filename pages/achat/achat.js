const recupePanier = JSON.parse(localStorage.getItem('panierValider'))

const conteneurAchat = document.querySelector('.lAchat')

conteneurAchat.innerHTML = ''

let totalGlobal = 0

recupePanier.forEach((element) => {

    totalGlobal += parseInt(element.total)

    const divAchat = document.createElement('div')
    divAchat.classList.add('achat')

    divAchat.innerHTML = `

    <div class="elementachat">
        <ul>
            <li>
                <span class="leProduit"><u>Produit</u>: ${element.nom} - </span>
                <span class="leprix"><u>Prix</u> : ${element.prix} FCFA - </span>
                <span class="laquantité"><u>Quantité</u> : ${element.quantite} - </span>
                <span class="saTotal"><u>Total</u> : ${element.total} FCFA</span>
            </li>
        </ul>
        <i class="fa-solid fa-check"></i>
    </div>
    `

    conteneurAchat.appendChild(divAchat)
});

const divTotal = document.createElement('div');
divTotal.classList.add('montotal');

divTotal.innerHTML = `
  <p>Total : </p>
  <p> <span class="leprix">${totalGlobal}</span><span>fr</span></p>
`

conteneurAchat.appendChild(divTotal);