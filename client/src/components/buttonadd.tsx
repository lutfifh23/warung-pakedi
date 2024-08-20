"use client";
import { ObjectId } from "mongodb";
import React from "react";

const ButtonAddWishlist = ({ id }: { id: ObjectId }) => {
    const handleAdd = async () => {
        try {
            const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
            const result = await fetch(url + "/api/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: id,
                }),
            });

            if (result.ok) {
                alert("Product added to wishlist successfully!");
            } else {
                const errorData = await result.json();
                alert(`Failed to add product to wishlist: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
            alert("An error occurred while adding product to wishlist.");
        }
    };

    return (
        <>
            <button
                onClick={handleAdd} className={`btn w-full bg-blue-500 text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
                Add to Wishlist
            </button>
        </>
    );
};

export default ButtonAddWishlist;