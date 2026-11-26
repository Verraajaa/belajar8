import { z } from "zod";

const schema = z.object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Format email tidak sesuai"),
    pesan: z.string().min(1),
});

export default schema;