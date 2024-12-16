const express = require("express");
const router = express.Router();
const pedidos = [
    {
        id: 1,
        total: 100,
        status: 'Aprobado',
        cart: [
            { name: 'Espresso Sencillo (4oz)', price: 16 },
            { name: 'Coca Cola 600ml', price: 20 },
            { name: '7 UP 600ml', price: 16 }
        ],
        paymentProof: 'comprobante1.jpg'
    },
    {
        id: 2,
        total: 120,
        status: 'Aprobado',
        cart: [
            { name: 'Capuchino (Sabor)', price: 30 },
            { name: 'Frappe', price: 40 },
            { name: 'Taro', price: 32 }
        ],
        paymentProof: 'comprobante2.jpg'
    },
    {
        id: 3,
        total: 50,
        status: 'Rechazado',
        cart: [
            { name: 'Chocolate', price: 27 },
            { name: 'Jugo del Valle 600ml', price: 16 }
        ],
        paymentProof: null
    }
];

const products = [
    { "id": 1, "name": "Espresso Sencillo (4oz)", "price": 16, "category": "Bebidas Calientes", "description": "Un espresso simple y fuerte.", "oferta": 0 },
    { "id": 2, "name": "Espresso Doble (8oz)", "price": 20, "category": "Bebidas Calientes", "description": "Un espresso doble para los amantes del café fuerte.", "oferta": 0 },
    { "id": 3, "name": "Americano (Chico)", "price": 21, "category": "Bebidas Calientes", "description": "Un café suave y equilibrado con agua caliente.", "oferta": 0 },
    { "id": 4, "name": "Capuchino (Sabor)", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Capuchino con un toque de sabor a tu elección.", "oferta": 1 },
    { "id": 5, "name": "Latte", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Café con leche cremoso y suave.", "oferta": 1 },
    { "id": 6, "name": "Moka", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Café con chocolate y leche, una combinación deliciosa.", "oferta": 0 },
    { "id": 7, "name": "Chocolate", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Bebida caliente de chocolate, perfecta para los amantes del dulce.", "oferta": 0 },
    { "id": 8, "name": "Vienés", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Café con crema batida y un toque de chocolate.", "oferta": 0 },
    { "id": 9, "name": "Tizanas de Frutas Naturales", "price": "27 / 30", "category": "Bebidas Calientes", "description": "Infusión de frutas naturales para un toque fresco.", "oferta": 1 },

    { "id": 10, "name": "Chamoyadas", "price": 45, "category": "Bebidas Frías", "description": "Bebida fría con chamoy y hielo triturado, ideal para el calor.", "oferta": 0 },
    { "id": 11, "name": "Frappe", "price": 40, "category": "Bebidas Frías", "description": "Bebida frappé con un toque de café y hielo.", "oferta": 0 },
    { "id": 12, "name": "Coca Cola 600ml", "price": 20, "category": "Bebidas Frías", "description": "Refresco clásico para refrescarte en cualquier momento.", "oferta": 0 },
    { "id": 13, "name": "Refresco Jarrito 600ml", "price": 17, "category": "Bebidas Frías", "description": "Refresco de sabor tradicional mexicano, en diferentes sabores.", "oferta": 0 },
    { "id": 14, "name": "Manzanita Sol 600ml", "price": 17, "category": "Bebidas Frías", "description": "Refresco de manzana, refrescante y ligeramente dulce.", "oferta": 0 },
    { "id": 15, "name": "7 UP 600ml", "price": 16, "category": "Bebidas Frías", "description": "Refresco de limón, fresco y burbujeante.", "oferta": 1 },
    { "id": 16, "name": "Refresco Jarrito 600ml", "price": 17, "category": "Bebidas Frías", "description": "Variedad de sabores en el refresco Jarrito, una opción refrescante.", "oferta": 1 },
    { "id": 17, "name": "7 UP 600ml", "price": 16, "category": "Bebidas Frías", "description": "Un toque refrescante de limón y burbujas.", "oferta": 1 },
    { "id": 18, "name": "Mirinda 600ml", "price": 16, "category": "Bebidas Frías", "description": "Sabor cítrico y dulce en un refresco de naranja.", "oferta": 0 },
    { "id": 19, "name": "Dr. Pepper 600ml", "price": 18, "category": "Bebidas Frías", "description": "Refresco con un sabor único, dulce y especiado.", "oferta": 0 },
    { "id": 20, "name": "Jugo del Valle 600ml", "price": 16, "category": "Bebidas Frías", "description": "Jugo natural de frutas, refrescante y saludable.", "oferta": 0 },
    { "id": 21, "name": "Pepsi Cola 600ml", "price": 17, "category": "Bebidas Frías", "description": "Refresco clásico de cola con un sabor refrescante.", "oferta": 1 },

    { "id": 22, "name": "Chai", "price": "29 / 32", "category": "Gourmet", "description": "Té especiado de la India, caliente y reconfortante.", "oferta": 1 },
    { "id": 23, "name": "Taro", "price": "29 / 32", "category": "Gourmet", "description": "Bebida dulce de taro, ideal para un toque exótico.", "oferta": 1 },
    { "id": 24, "name": "Matcha", "price": "29 / 32", "category": "Gourmet", "description": "Bebida de té verde matcha, energética y saludable.", "oferta": 0 },
    { "id": 25, "name": "Horchata", "price": "29 / 32", "category": "Gourmet", "description": "Bebida dulce y refrescante a base de arroz y canela.", "oferta": 1 }
];

router.get("/checkout", (req, res) => {
    const cart = req.session.cart || []; // Obtén el carrito desde la sesión
    const total = cart.reduce((sum, product) => sum + (product.price || 0), 0); // Calcula el total
    res.render("checkout", { cart, total }); // Pasa cart y total al template
});

router.get("/cancel-purchase", (req, res) => {
    req.session.cart = []; // Limpia el carrito
    res.redirect("/"); // Redirige al home
});




router.get("/", (req, res) => {
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    res.render("home", { categories: groupedProducts });
});


// Ruta para agregar un producto al carrito
router.post("/add-to-cart", (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id == productId);

    if (!product) {
        return res.status(400).send("Producto no encontrado");
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect("/cart");
});

// Ruta para ver el carrito
router.get("/cart", (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    res.render("cart", { cart, total });
});

// Ruta para eliminar un producto del carrito
router.post("/remove-from-cart", (req, res) => {
    const { productId } = req.body;

    console.log("Eliminar producto con ID:", productId); // Verifica que el ID sea recibido correctamente

    if (!req.session.cart) {
        return res.redirect("/cart");
    }

    // Eliminar el producto con el ID recibido del carrito
    req.session.cart = req.session.cart.filter(p => p.id != productId);

    // Redirigir al carrito actualizado
    res.redirect("/cart");
});

// Ruta para renderizar la página de login
router.get("/login", (req, res) => {
    res.render("login");  // Renderiza el archivo login.handlebars
});

// Ruta para mostrar las ofertas
router.get("/promos", (req, res) => {
    // Filtrar solo productos con oferta
    const ofertaProducts = products.filter(product => product.oferta === 1);

    // Agrupar los productos en oferta por categoría
    const groupedOfferProducts = ofertaProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Renderizar la vista 'promos' con las categorías y productos filtrados
    res.render("promos", { categories: groupedOfferProducts });
});


// Ruta para renderizar la página de login
router.get("/home", (req, res) => {
    res.render("home");  // Renderiza el archivo login.handlebars
});


// Ruta para la vista de administrador
router.get('/admin', (req, res) => {
    const pedidos = [
        {
            id: 1,
            total: 100,
            status: 'Aprobado',
            cart: [
                { name: 'Espresso Sencillo (4oz)', price: 16 },
                { name: 'Coca Cola 600ml', price: 20 },
                { name: '7 UP 600ml', price: 16 }
            ],
            paymentProof: 'comprobante1.jpg'
        },
        {
            id: 2,
            total: 120,
            status: 'Aprobado',
            cart: [
                { name: 'Capuchino (Sabor)', price: 30 },
                { name: 'Frappe', price: 40 },
                { name: 'Taro', price: 32 }
            ],
            paymentProof: 'comprobante2.jpg'
        },
        {
            id: 3,
            total: 50,
            status: 'Rechazado',
            cart: [
                { name: 'Chocolate', price: 27 },
                { name: 'Jugo del Valle 600ml', price: 16 }
            ],
            paymentProof: null
        }
    ];

    // Renderiza la vista 'admin' pasando los datos de los pedidos
    res.render('admin', { pedidos });
});



// Simular una base de datos para pedidos
let orders = [];

router.post('/confirm-purchase', (req, res) => {
    const { paymentProof, cart, total } = req.body;

    const newOrder = {
        id: orders.length + 1,
        cart: cart || [], // Asegúrate de que 'cart' llega como un arreglo
        total: total || 0,
        paymentProof: paymentProof || '',
        status: 'Pedido Exitoso',
    };

    orders.push(newOrder);

    console.log("Pedidos actuales:", orders); // Verifica que el pedido se almacene correctamente

    res.redirect('/');
});

// Ruta para admin
router.get("/admin", (req, res) => {
    res.render("admin", { orders }); // Pasa la variable orders a la vista
});

module.exports = router;

