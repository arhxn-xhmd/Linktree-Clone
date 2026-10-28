export const instant = false

import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"
import { connection } from "next/server"

export default async function Page({ params }) {
    const { handle } = await params
    await connection()

    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")
    const items = await collection.findOne({handle: handle})

    if (!items) {
        return notFound()
    }
    
    return <div className="flex min-h-screen bg-purple-400 justify-center items-center">
        {items && <div className="flex justify-center items-center py-10 flex-col gap-4">
            <img width={80} src={items.pic} alt="" />
            <span className="font-bold text-xl text-center">@{items.handle}</span>
            <span className="w-80 text-center">{items.desc}</span>

            <div>
                {items.links.map((item, index) => {
                    return <Link href={item.link} key={index}>
                        <div className="py-4 px-2 bg-purple-100 rounded-md my-3 shadow-lg min-w-96 flex justify-center">
                            {item.linktext}
                        </div>
                    </Link>
                })}
            </div>
        </div>}

    </div>
}