import Image from 'next/image';
import Link from 'next/link';
import logo from "@/assets/logo.png";
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import ToggleTheme from './ToggleTheme';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect(`/search?query=${searchQuery}`);
    }
}

export default async function NavBar() {
    const session = await getServerSession(authOptions);
    const cart = await getCart();

    return (
        <div className='bg-base-100'>
            <div className="navbar flex-col sm:flex-row gap-2 bg-primary text-primary-content px-4">
                <div className="flex-1">
                    <Link href="/" className='btn btn-ghost text-xl normal-case'>
                        <Image
                            src={logo}
                            alt='logo Ecommerce'
                            width={40}
                            height={40}
                        />
                        Ecommerce
                    </Link>
                </div>
                <div className="flex-none gap-5">
                    <ToggleTheme />
                    <form action={searchProducts}>
                        <div className='form-control'>
                            <input
                                name='searchQuery'
                                placeholder='Search'
                                className='input input-bordered w-full min-w-[100px] text-slate-500'
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    );
}