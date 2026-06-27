const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida");

    await sequelize.sync({ alter: true }); // alter: aplica los nuevos campos sin borrar datos
    console.log("✅ Modelos sincronizados");

    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar:", error.message);
  }
}

start();