import {redirect} from "next/navigation";

export async function navigate(url: string) {
    return redirect(url)
}
