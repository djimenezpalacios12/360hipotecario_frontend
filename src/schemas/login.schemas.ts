import { z } from "zod";

import { regexEmail } from "@/lib/regex";

// 1. Create schema
export const formSchema = z.object({
  email: z.string().regex(regexEmail, {
    message: "Ingresar un correo válido",
  }),
  contraseña: z.string().min(1, {
    message: "Ingresar una contraseña",
  }),
});
