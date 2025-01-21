import app from "./app";
import env from "env-var";

// Puerto dinámico desde variables de entorno o por defecto 3000
const PORT = env.get("PORT").default(3000).asInt();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
