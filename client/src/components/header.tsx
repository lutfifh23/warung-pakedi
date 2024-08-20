import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/logoutbotton';
import { cookies } from 'next/headers';

const Header = () => {
    const getCookies = cookies().get('Authorization')
    let isLogin

    if (getCookies) {
        isLogin = true
    } else {
        isLogin = false
    }
    return (
        <div className="navbar bg-base-100">
            {/* Container for left-side content */}
            <div className="flex-1">
                <Link href={'/'} className="text-xl btn btn-ghost">
                    WarungPaEdi
                </Link>
            </div>

            {/* Container for right-side content */}
            <div className="flex flex-1 justify-end items-center space-x-4">
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href={'/wishlist'}>
                            <button className="btn btn-ghost">View cart</button>
                        </Link></li>
                        <li><Link className='btn btn-ghost' href="/product">Product</Link></li>
                        <li><Link className='btn btn-ghost' href="/about">About</Link></li>
                        {isLogin ? (
                            <li><LogoutButton /></li>
                        ) : (
                            <>
                                <li><Link className='btn btn-ghost' href="/login">Login</Link></li>
                                <li><Link className='btn btn-ghost' href="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
