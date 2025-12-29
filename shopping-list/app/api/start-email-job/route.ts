import { qstashClient } from "@/background-job/action";
import { createClient } from "@/config/supabase/supabase-ssr"
import { NextRequest, NextResponse } from "next/server";
import { SendEmailInput } from "@/lib/zod-validations";
import { parseZodError } from "@/lib/zod-error";

export const POST = async (req: NextRequest) => {
    const supabase = createClient();
    const result = await supabase.auth.getSession();

    if(!result.data.session) return NextResponse.json("Unauthorized", {status: 401});

    const body = await req.json();
    const { success, data, error } = SendEmailInput.safeParse(body);

    if(!success){
        return NextResponse.json(parseZodError(error), {status: 400})
    }
    const user = await supabase.auth.getUser();
    const { recipient, listLink, listName } = data;
    
    const rootDomain = req.url.split('/').slice(0, 3).join('/');
   
    const emailAPIURL = `${rootDomain}/api/send-email`;
    console.log('jo')
    try {
        if(process.env.NODE_ENV === "development"){
            await fetch("http://localhost:3000/api/send-email", { 
                method: "POST",
                body: JSON.stringify({ recipient: recipient, listLink, listName, sender: user.data.user?.user_metadata.full_name || "Anonymous" }),
                headers: { "Content-Type": "application/json" }
            });
            return NextResponse.json("Email job started in dev", { status: 200, });
        }
        await qstashClient.publishJSON({
            url: emailAPIURL,
            body: {
                recipient: recipient, 
                listLink, 
                listName,
                sender: user.data.user?.user_metadata.full_name || "Anonymous"
            }
        });
        
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json("Email job started", { status: 200 });
}