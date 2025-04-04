// Cette fonction sera appelée lorsque la page sera chargée
window.onload = function() {
    // Afficher le logo pendant 8 secondes
    setTimeout(function() {
        // Cacher le logo après 8 secondes
        const logoContainer = document.getElementById("logo-container");
        if (logoContainer) {
            logoContainer.style.display = "none"; // Masquer le logo
        }

        // Afficher le contenu principal de la page après 8 secondes
        const content = document.getElementById("content");
        if (content) {
            content.style.display = "block"; // Afficher le contenu
        }
    }, 8000); // Délai de 8 secondes
};

// Gérer l'ajout de produit au panier
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(product => product.id === productId);

    if (existingProductIndex !== -1) {
        // Si le produit existe déjà, augmenter la quantité
        cart[existingProductIndex].quantity += 1;
    } else {
        // Ajouter un nouveau produit au panier
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(product);
    }

    // Sauvegarder le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Afficher une alerte de confirmation
    alert(`${productName} a été ajouté au panier !`);
}

// Ajouter un écouteur d'événement sur tous les boutons "Ajouter au panier"
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            const productItem = button.closest(".product-item");
            const productId = index + 1; // Utilisation de l'index comme ID
            const productName = productItem.querySelector("h3").innerText;
            const productPrice = parseFloat(productItem.querySelector("p").innerText.replace("Prix: ", "").replace("€", ""));

            // Ajouter au panier
            addToCart(productId, productName, productPrice);
        });
    });
});
