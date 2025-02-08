/* // admin.js

// Données temporaires (simulées)
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];

// Références aux éléments du DOM
const userForm = document.getElementById('user-form');
const productForm = document.getElementById('product-form');
const categoryForm = document.getElementById('category-form');
const userList = document.getElementById('user-list');
const productList = document.getElementById('product-list');
const categoryList = document.getElementById('category-list');
const clientList = document.getElementById('client-list');

// Gestion de la navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Retire la classe active de tous les liens et sections
        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        sections.forEach((section) => section.classList.remove('active'));

        // Ajoute la classe active au lien cliqué et à la section correspondante
        link.classList.add('active');
        const target = document.querySelector(link.getAttribute('href'));
        target.classList.add('active');
    });
});

// Fonction pour convertir une image en data URL
function getImageData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

// Gestion des Utilisateurs
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Utilisateur créé avec succès !');
    userForm.reset();
    loadUsers();
});

// Gestion des Produits
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const category = document.getElementById('product-category').value;
    const imageFile = document.getElementById('product-image').files[0];

    try {
        const imageData = await getImageData(imageFile);
        const newProduct = { name, description, price, category, image: imageData };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Produit ajouté avec succès !');
        productForm.reset();
        loadProducts();
    } catch (error) {
        console.error('Erreur : ', error);
    }
});

// Gestion des Catégories
categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('category-name').value;

    const newCategory = { name };
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    alert('Catégorie ajoutée avec succès !');
    categoryForm.reset();
    loadCategories();
});

// Fonction pour éditer un produit
function editProduct(index) {
    const product = products[index];
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;

    const submitButton = productForm.querySelector('button');
    submitButton.textContent = 'Modifier';
    productForm.onsubmit = (e) => {
        e.preventDefault();
        updateProduct(index);
    };
}

// Fonction pour mettre à jour un produit
function updateProduct(index) {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const category = document.getElementById('product-category').value;
    const imageFile = document.getElementById('product-image').files[0];

    if (imageFile) {
        getImageData(imageFile).then((imageData) => {
            products[index] = { name, description, price, category, image: imageData };
            localStorage.setItem('products', JSON.stringify(products));
            alert('Produit modifié avec succès !');
            productForm.reset();
            loadProducts();
        });
    } else {
        products[index] = { ...products[index], name, description, price, category };
        localStorage.setItem('products', JSON.stringify(products));
        alert('Produit modifié avec succès !');
        productForm.reset();
        loadProducts();
    }

    const submitButton = productForm.querySelector('button');
    submitButton.textContent = 'Ajouter un Produit';
    productForm.onsubmit = (e) => {
        e.preventDefault();
        addProduct();
    };
}

// Fonction pour supprimer un produit
function deleteProduct(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Produit supprimé avec succès !');
        loadProducts();
    }
}

// Fonction pour éditer un utilisateur
function editUser(index) {
    const user = users[index];
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-password').value = user.password;

    const submitButton = userForm.querySelector('button');
    submitButton.textContent = 'Modifier';
    userForm.onsubmit = (e) => {
        e.preventDefault();
        updateUser(index);
    };
}

// Fonction pour mettre à jour un utilisateur
function updateUser(index) {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    users[index] = { name, email, password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Utilisateur modifié avec succès !');
    userForm.reset();
    loadUsers();

    const submitButton = userForm.querySelector('button');
    submitButton.textContent = 'Créer un Utilisateur';
    userForm.onsubmit = (e) => {
        e.preventDefault();
        addUser();
    };
}

// Fonction pour supprimer un utilisateur
function deleteUser(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Utilisateur supprimé avec succès !');
        loadUsers();
    }
}

// Fonction pour éditer une catégorie
function editCategory(index) {
    const category = categories[index];
    document.getElementById('category-name').value = category.name;

    const submitButton = categoryForm.querySelector('button');
    submitButton.textContent = 'Modifier';
    categoryForm.onsubmit = (e) => {
        e.preventDefault();
        updateCategory(index);
    };
}

// Fonction pour mettre à jour une catégorie
function updateCategory(index) {
    const name = document.getElementById('category-name').value;

    categories[index] = { name };
    localStorage.setItem('categories', JSON.stringify(categories));
    alert('Catégorie modifiée avec succès !');
    categoryForm.reset();
    loadCategories();

    const submitButton = categoryForm.querySelector('button');
    submitButton.textContent = 'Ajouter une Catégorie';
    categoryForm.onsubmit = (e) => {
        e.preventDefault();
        addCategory();
    };
}

// Fonction pour supprimer une catégorie
function deleteCategory(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        categories.splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(categories));
        alert('Catégorie supprimée avec succès !');
        loadCategories();
    }
}

// Fonction pour éditer un client
function editClient(index) {
    const client = users[index];
    document.getElementById('user-name').value = client.name;
    document.getElementById('user-email').value = client.email;
    document.getElementById('user-password').value = client.password;

    const submitButton = userForm.querySelector('button');
    submitButton.textContent = 'Modifier';
    userForm.onsubmit = (e) => {
        e.preventDefault();
        updateClient(index);
    };
}

// Fonction pour mettre à jour un client
function updateClient(index) {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    users[index] = { name, email, password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Client modifié avec succès !');
    userForm.reset();
    loadClients();

    const submitButton = userForm.querySelector('button');
    submitButton.textContent = 'Créer un Utilisateur';
    userForm.onsubmit = (e) => {
        e.preventDefault();
        addUser();
    };
}

// Fonction pour supprimer un client
function deleteClient(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Client supprimé avec succès !');
        loadClients();
    }
}

// Charger les utilisateurs avec icônes
function loadUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        userList.innerHTML += `
      <li>
        <div>
          <h3>${user.name}</h3>
          <p>Email : ${user.email}</p>
          <button onclick="editUser(${index})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteUser(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </li>
    `;
    });
}

// Charger les produits avec icônes
function loadProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        productList.innerHTML += `
      <li>
        <img src="${product.image}" alt="${product.name}" width="100">
        <div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Prix : ${product.price}€</p>
          <p>Catégorie : ${product.category}</p>
          <button onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </li>
    `;
    });
}

// Charger les catégories avec icônes
function loadCategories() {
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        categoryList.innerHTML += `
      <li>
        <div>
          <h3>${category.name}</h3>
          <button onclick="editCategory(${index})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteCategory(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </li>
    `;
    });
}

// Charger les clients avec icônes
function loadClients() {
    clientList.innerHTML = '';
    users.forEach((client, index) => {
        clientList.innerHTML += `
      <li>
        <div>
          <h3>${client.name}</h3>
          <p>Email : ${client.email}</p>
          <button onclick="editClient(${index})"><i class="fas fa-edit"></i></button>
          <button onclick="deleteClient(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </li>
    `;
    });
}

// Charger les données au démarrage
loadUsers();
loadProducts();
loadCategories();
loadClients();



 */
// Importer Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

