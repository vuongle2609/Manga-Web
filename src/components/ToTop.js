export default function ToTop() {
    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <div className="fixed bottom-4 right-4 h-10 w-10 z-50 bg-slights dark:bg-sdarks
         rounded-md flex items-center justify-center
        dark:text-white font-medium text-2xl
        " 
            onClick={scroll}
        >
            <i className='bx bx-chevron-up'></i>
        </div>
    )
}