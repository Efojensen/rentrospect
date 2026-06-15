interface OvalStatusTile {
    label: string
    bgColor: string
    textColor: string
}

const OvalStatusTile: React.FC<OvalStatusTile> = ({ label, bgColor, textColor }) => {
    return (
        <div
            style={{ backgroundColor: bgColor, color: textColor }}
            className="flex text-[.75rem] dmSans-font leading-4 tracking-[.075rem] uppercase w-min px-3 py-1 rounded-[624.9375rem]"
        >
            {label}
        </div>
    )
}

export default OvalStatusTile