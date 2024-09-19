import { z } from "zod";

const genero = z.enum(["MASCULINO", "FEMININO", "OUTRO"]);

const generoOptions = genero.options.map((value) => ({
  key: value,
  label: value.charAt(0) + value.slice(1).toLowerCase(),
  value: value,
}));

export { generoOptions };
export default genero;
