export default function Skeleton() {
    return (
        <article className='bg-stone-50 w-full p-7 rounded animate-pulse'>
            <header className='flex gap-3'>
                <svg className='text-gray-200 w-14 h-14 rounded-full' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clip-rule='evenodd'></path></svg>
                <div className={`flex flex-col justify-center`}>
                    <div className='h-2.5 bg-gray-200 rounded-full w-48 mb-2'></div>
                    <div className='h-2.5 bg-gray-200 rounded-full w-16'></div>
                </div>
            </header>
            <br></br>

            <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
            <div className='h-2 bg-gray-200 rounded-full mb-2.5'></div>
            <div className='h-2 bg-gray-200 rounded-full'></div>
            <br></br>
            <div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded'>
                <svg className='w-12 h-12 text-gray-200' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' fill='currentColor' viewBox='0 0 640 512'><path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' /></svg>
            </div>
            <br></br>

            <footer>
                <div className='font-bold h-2.5 bg-gray-200 rounded-full w-32 mb-2'></div>
            </footer>
        </article>
    )
}
