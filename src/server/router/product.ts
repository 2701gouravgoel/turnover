import { z } from "zod";
//import { Prisma } from "@prisma/client";
import { t } from "../trpc";
let products=[
    {
      "id": 1,
      "title": "iPhone 9",
      "checkIn": false
    },
    {
      "id": 2,
      "title": "iPhone X",
      "checkIn": false
    },
    {
      "id": 3,
      "title": "Samsung Universe 9",
      "checkIn": false
    },
    {
      "id": 4,
      "title": "OPPOF19",
      "checkIn": false
    },
    {
      "id": 5,
      "title": "Huawei P30",
      "checkIn": false
    },
    {
      "id": 6,
      "title": "MacBook Pro",
      "checkIn": false
    },
    {
      "id": 7,
      "title": "Samsung Galaxy Book",
      "checkIn": false
    },
    {
      "id": 8,
      "title": "Microsoft Surface Laptop 4",
      "checkIn": false
    },
    {
      "id": 9,
      "title": "Infinix INBOOK",
      "checkIn": false
    },
    {
      "id": 10,
      "title": "HP Pavilion 15-DK1056WM",
      "checkIn": false
    },
    {
      "id": 11,
      "title": "perfume Oil",
      "checkIn": false
    },
    {
      "id": 12,
      "title": "Brown Perfume",
      "checkIn": false
    },
    {
      "id": 13,
      "title": "Fog Scent Xpressio Perfume",
      "checkIn": false
    },
    {
      "id": 14,
      "title": "Non-Alcoholic Concentrated Perfume Oil",
      "checkIn": false
    },
    {
      "id": 15,
      "title": "Eau De Perfume Spray",
      "checkIn": false
    },
    {
      "id": 16,
      "title": "Hyaluronic Acid Serum",
      "checkIn": false
    },
    {
      "id": 17,
      "title": "Tree Oil 30ml",
      "checkIn": false
    },
    {
      "id": 18,
      "title": "Oil Free Moisturizer 100ml",
      "checkIn": false
    },
    {
      "id": 19,
      "title": "Skin Beauty Serum.",
      "checkIn": false
    },
    {
      "id": 20,
      "title": "Freckle Treatment Cream- 15gm",
      "checkIn": false
    },
    {
      "id": 21,
      "title": "- Daal Masoor 500 grams",
      "checkIn": false
    },
    {
      "id": 22,
      "title": "Elbow Macaroni - 400 gm",
      "checkIn": false
    },
    {
      "id": 23,
      "title": "Orange Essence Food Flavou",
      "checkIn": false
    },
    {
      "id": 24,
      "title": "cereals muesli fruit nuts",
      "checkIn": false
    },
    {
      "id": 25,
      "title": "Gulab Powder 50 Gram",
      "checkIn": false
    },
    {
      "id": 26,
      "title": "Plant Hanger For Home",
      "checkIn": false
    },
    {
      "id": 27,
      "title": "Flying Wooden Bird",
      "checkIn": false
    },
    {
      "id": 28,
      "title": "3D Embellishment Art Lamp",
      "checkIn": false
    },
    {
      "id": 29,
      "title": "Handcraft Chinese style",
      "checkIn": false
    },
    {
      "id": 30,
      "title": "Key Holder",
      "checkIn": false
    }
  ]
  
  
export const productRouter = t.router({
    getProducts: t.procedure
    .input( z.object({ page: z.number() }) )
    .query(async ({ input }) => {
            const {page}=input;
            return products.slice(page*6,(page+1)*6);
        },
    ),
    checkInProduct: t.procedure
    .input( z.object({ id: z.number(),userId: z.number()}) )
    .mutation(async ({ input }) => {
        const { id ,userId} = input;
        if(!userId)return null
        products=products.map((json)=>{
            const {id:i,checkIn}=json
            if(i===id)
            {
                return {...json,checkIn:!checkIn}
            }
            return json
        })
    }),
});