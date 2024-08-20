import Link from "next/link";

export default function SideNav() {
    return (
        <header className="text-gray-800 bg-white py-4">
            <div className="container mx-auto flex justify-center items-center">
                <Link href={'/'}><h1 className="text-4xl font-bold">WarungPaEdi</h1></Link>
            </div>
        </header>
    )
}