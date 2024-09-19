import { z } from "zod";

const roles = z.enum(['ADMIN', 'USER']);

export default roles;
