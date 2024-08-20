'use client';
import { ObjectId } from "mongodb";
import { FormEvent } from "react";

export default function ButtonDelete({ id }: { id: ObjectId }) {
    const handleDelete = async () => {
        try {
            const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
            const result = await fetch(url + `/api/wishlist`, {
                method: "DELETE",
                body: JSON.stringify({
                    id
                })
            })
            if (result.ok) {
                alert("Product deleted from wishlist successfully!");
                window.location.reload();
            } else {
                const errorData = await result.json();
                alert(`Failed to delete product from wishlist: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error deleting product from wishlist:", error);
            alert("An error occurred while deleting product from wishlist.");
        }
    }
    return (
        <>
            <button onClick={handleDelete} className="btn bg-red-500 text-white">
                Delete Wishlist
            </button>
        </>
    )
}