import { Link, NavLink, useLoaderData, useNavigate } from "react-router"
import { logOutUser } from "~/appwrite/auth";
import { sidebarItems } from "~/constants"
import { cn } from "~/libs/utility"
const NavItems = ( { handleClick }: { handleClick: ( ) => void}) => {
    const user = useLoaderData();
    const navigate = useNavigate();
    const handleLogOut = async () => {
        await logOutUser();
        navigate('/sign-in')
    }
  return (
    <section className="nav-items">
        <Link to='/' className='link-logo'>
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Tourvisto</h1>
        </Link>

        <div className="container">
            <nav>
                {sidebarItems.map(({ id, icon, label , href}) =>(
                    <NavLink to={href} key={id}>
                        {({isActive }: {isActive: boolean}) => (
                            <div className={cn( "group nav-item", {
                                'bg-primary-100 !text-white': isActive,
                            } )} onClick={handleClick}> 
                                <img src={icon} alt={label}
                                className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                                />
                                {label}</div>
                        )}
                    </NavLink>
                ) )}
            </nav>
        </div>

        <footer className="nav-footer">
            <img src={user?.imageUrl || "/assets/images/david.webp" } alt={user?.name || 'sajid'} referrerPolicy="no-referrer" />
            <article>
                <h2>{user?.name || 'Sajid Ali'}</h2>
                <p>{user?.email || "sajidali"}</p>      
            </article>

            <button onClick={handleLogOut} className="cursor-pointer">
                <img src="/assets/icons/logout.svg" alt="logout" className="size-6" /> 
            </button>
        </footer>
      
    </section>
  )
}

export default NavItems;
