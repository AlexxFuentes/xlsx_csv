export function Header() {
    return (
        <div className='sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm'>
            <div className='navbar'>
                <div className='navbar-start'>
                </div>
                <div className='navbar-center'>
                    <a className='btn btn-ghost normal-case lg:text-xl' href='/'>xlsx a csv</a>
                </div>
                <div className='navbar-end'>                    
                </div>
            </div>
        </div>
    )
}