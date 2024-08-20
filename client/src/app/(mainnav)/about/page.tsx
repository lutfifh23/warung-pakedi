import Link from "next/link";

export default function About() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        WarungPaEdi adalah aplikasi digital yang dirancang untuk mempermudah pengalaman berbelanja di toko kelontongan. Dengan mengintegrasikan teknologi modern ke dalam pengalaman belanja sehari-hari, WarungPaEdi bertujuan untuk menyediakan platform yang efisien dan ramah pengguna untuk memenuhi kebutuhan belanja Anda.
                    </p>
                    <Link href={'/'}><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
    )
}