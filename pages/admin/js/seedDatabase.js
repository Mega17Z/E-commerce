// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB1tz1sIW3y03daEYajXkn8qf1X7bnO0HA",
    authDomain: "e-commerce-61238.firebaseapp.com",
    projectId: "e-commerce-61238",
    storageBucket: "e-commerce-61238.firebasestorage.app",
    messagingSenderId: "282212309381",
    appId: "1:282212309381:web:32c2606f462d858a85ccec"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour ajouter des utilisateurs
async function seedUsers() {
    const usersCollection = db.collection("users");
  
    await usersCollection.add({
      name: "Admin Principal",
      email: "admin@example.com",
      password: "hashed_admin_password",
      role: "admin",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await usersCollection.add({
        name: "Marie Martin",
        email: "marie.martin@example.com",
        password: "hashed_client_password",
        role: "client",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
}


