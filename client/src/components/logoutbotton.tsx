import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function LogoutButton() {
    return (
        <>
            <form action={async () => {
                'use server'
                cookies().delete('Authorization')
                redirect('/')
            }}>
                <button type="submit" className="btn btn-ghost">
                    Logout
                </button>
            </form>
        </>
    )
}