
import { db } from '@/lib/db';
import { storeurl } from '@/lib/db/schema';
import { scanUrl } from '@/lib/virus-total';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     const scanurl = await req.json();
//     const { userId } = auth();
//     const url = scanurl.url || " ";
//     try {
//         const result = await scanUrl(url);
//         const { id: urlId } = result.data || " ";
//         const store_id = await db
//             .insert(storeurl)
//             .values({
//                 urlId: urlId,
//                 url: url,
//                 userId,
//             })
//             .returning({
//                 insertedId: storeurl.id,
//             });

//         return NextResponse.json(result);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Failed to store in the database' });
//     }
// }




// Define an interface or type for the data you are inserting
interface StoreData {
    userId: any;
    urlId: string;
    url: string;
    id?: number; // Optional property
    createdAt?: Date; // Optional property
}

// Your function using the strongly typed interface
export async function POST(req: Request) {
    const scanurl = await req.json();
    const { userId } = auth();
    const url = scanurl.url;

    try {
        const result = await scanUrl(url);
        const { id: urlId } = result.data;

        // Create an object with the strongly typed properties
        const storeData: StoreData = {
            urlId: urlId !== null ? urlId : '',
            url: url,
            userId,
        };

        // Use the strongly typed object when calling the insert and values methods
        const store_id = await db
            .insert(storeurl)
            .values(storeData)
            .returning({
                insertedId: storeurl.id,
            });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to store in the database' });
    }
}
