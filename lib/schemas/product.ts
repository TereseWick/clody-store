
import { z } from 'zod';

export const ProductCardSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    priceNok: z.number(),
    images: z.array(z.object({
        url: z.string(),
        alt: z.string().nullable(),
    })),
    
});

export type ProductCardData = z.infer<typeof ProductCardSchema>;