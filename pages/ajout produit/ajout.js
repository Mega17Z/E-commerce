const nom = document.getElementById('nom')
const prix = document.getElementById('prix')
const importImage = document.getElementById('imageInput')

const imageImport = document.getElementById('imageImport')

const Sauvegarder = document.getElementById('enregistrer')

const tabProduit = []


importImage.addEventListener('change', () => {
    const fichier = importImage.files[0]
    if (fichier) {
        const reader = new FileReader()

        reader.onload = (e) => {
            const leChemin = e.target.result

            imageImport.src = leChemin

            Sauvegarder.addEventListener('click', (e) => {
                e.preventDefault()
            
                if(nom.value == "" || prix.value == "" || importImage.value == ""){
                    return
                }

                const leproduit = {
                    name: nom.value,
                    prix: prix.value,
                    image: leChemin
                }

                tabProduit.push(leproduit)

                console.log(tabProduit)

                localStorage.setItem('Tableau Produit', JSON.stringify(tabProduit))

                nom.value = ""
                prix.value = ""
                imageImport.src = ""
                importImage.value = ""
            })
        }

        reader.readAsDataURL(fichier)
    }
})

// console.log (tabProduit)