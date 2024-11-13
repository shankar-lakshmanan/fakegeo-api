import swaggerSpec from "./swagger-config";
import * as fs from "fs";

// Write the swagger spec to a file
fs.writeFileSync("./fakegeo-web/swagger-output.json", JSON.stringify(swaggerSpec, null, 2));

console.log("Swagger documentation generated at swagger-output.json");
