const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Configuración de Handlebars con helpers personalizados
const hbs = exphbs.create({
    helpers: {
        json: (context) => JSON.stringify(context, null, 2), // Helper para convertir objetos a JSON
    },
    defaultLayout: "main", // Define el layout por defecto (si aplica)
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: "secreto-ecommerce",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.static("public"));

// Rutas
const routes = require("./routes/index");
app.use("/", routes); // Montar las rutas definidas en routes/index.js

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render("404", { layout: false });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
