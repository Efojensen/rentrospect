interface ProgressBarProps {
    progress: number
    total: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    total,
}) => {
    const percentage = (progress / total) * 100

    return (
        <div className='w-full mb-2'>

            {/* Top Labels */}
            <div className='flex justify-between mb-1'>
                <p className='poppins-font text-[.75rem] text-loginTextClr'>In progress</p>
                <p className='poppins-font text-[.75rem] text-loginTextClr'>x days left</p>
            </div>

            {/* Bar Container */}
            <div className='relative w-full h-2 rounded-full bg-[#D1D5DB] overflow-visible'>

                {/* Filled Progress */}
                <div
                    className='h-full rounded-full bg-[#1E293B]'
                    style={{ width: `${percentage}%` }}
                />

                {/* Floating Number */}
                {/* <div
                    className='absolute -top-1.5 -translate-x-1/2'
                    style={{ left: `${percentage}%` }}
                >
                    <div className='bg-[#EF4444] text-white text-[10px] font-semibold px-1.5 py-px rounded'>
                        {progress}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ProgressBar