import config from "@/lib/config";
import dummyBooks from "@/dummybooks.json"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { books } from "./schema";
import ImageKit from "imagekit";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
const endpointUrl = process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL!

const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint : endpointUrl
});

const imageKitUpload = async (fileUrl: string, fileName: string, folder: string,) => {

    const uploadResponse = await imagekit.upload({
        file:fileUrl,
        fileName,
        folder,
    });
    return uploadResponse?.url as string
}

const seedData = async() => {
    console.log("... Seeding data")
    try {
        for (const book of dummyBooks) {
            const coverUrl = await imageKitUpload(book.coverUrl, book.title,  "images/covers") as string
            const videoUrl= await imageKitUpload(book.videoUrl, book.title, "videos/trailers") as string

            await db.insert(books).values({...book, coverUrl, videoUrl});
        }
        console.log("Data seeded successfully!");
    } catch (error) {
        console.log(error)
    }
}

seedData();