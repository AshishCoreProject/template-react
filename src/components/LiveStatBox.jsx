const LiveStatBox = ()=> {

    return (
        <div>
            <div className='livestatbox'>
                <div className="text-xl flex justify-between text-right h-8 px-4 bg-[#FF5F00]">
                    <p>Balance</p>
                    <p>$ 1000</p>
                </div>
                <div className="statsHeader rounded-b-lg"></div>
                <div className="statsBody"></div>
            </div>
        </div>
    )
}

export default LiveStatBox;