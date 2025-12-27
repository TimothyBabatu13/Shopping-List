import { qstashClient } from "@/background-job/action";
import { createClient } from "@/config/supabase/supabase-ssr"
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const supabase = createClient();
    const result = await supabase.auth.getSession();
    if(!result.data.session) return new Response("Email job started", {status: 401});
    const rootDomain = req.url.split('/').slice(0, 3).join('/');
   console.log(rootDomain)
    const emailAPIURL = `${rootDomain}/api/send-email`;

    try {
        if(process.env.NODE_ENV === "development"){
            await fetch("http://localhost:3000/api/send-email", { 
                method: "POST",
                body: JSON.stringify({ receiver: "knbtimothy@gmail.com" }),
                headers: { "Content-Type": "application/json" }
            });
            return NextResponse.json("Email job started in dev", { status: 200, });
        }
        await qstashClient.publishJSON({
            url: emailAPIURL,
            body: {
                receiver: 'knbtimothy@gmail.com',
            }
        });
        
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json("Email job started", { status: 200, });
}