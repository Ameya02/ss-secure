// import { db } from "@/lib/db";
// import { storefile } from "@/lib/db/schema";
// import { auth } from "@clerk/nextjs";
// import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { storefile } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const fileData = await req.json();
//     const file_Id = fileData.fileId || " ";
//     const file_Name = fileData.fileName || " " ;
//     const { userId } = auth();
//     const store_id = await db
//       .insert(storefile)
//       .values({
//         fileId: file_Id,
//         filename: file_Name,
//         userId,
//       })
//       .returning({
//         insertedId: storefile.id,
//       });
//     return NextResponse.json({ success: true });

//   }
//   catch (error) {
//     console.log(error);
//   }
// }




export async function POST(req: NextRequest) {
  try {
    const fileData = await req.json();
    const file_Id = fileData.fileId || " ";
    const file_Name = fileData.fileName || " ";
    const { userId } = auth();

    if (!userId) {
      throw new Error('User ID is null');
    }

    const store_id = await db
      .insert(storefile)
      .values({
        fileId: file_Id,
        filename: file_Name,
        userId,
      })
      .returning({
        insertedId: storefile.id,
      });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}