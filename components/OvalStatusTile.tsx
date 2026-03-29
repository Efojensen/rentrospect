interface OvalStatusTile {
    label: string
    bgColor: string
    textColor: string
}

const OvalStatusTile:React.FC<OvalStatusTile> = ({ label, bgColor, textColor }) => {
    return (
        <div className={`flex text-[.75rem] dmSans-font leading-4 tracking-[.075rem] uppercase text-[${textColor}] bg-[${bgColor}] w-22.75 px-3 py-1 rounded-[624.9375rem]`}>
            {label}
        </div>
    )
}

export default OvalStatusTile