interface StatusCircleProps {
    color: string
    size?: number
}

const StatusCircle: React.FC<StatusCircleProps> = ({
    color,
    size = 20,
}) => {
    return (
        <div
            className='flex items-center justify-center rounded-full border-2'
            style={{
                width: size,
                height: size,
                borderColor: color,
            }}
        >
            <div
                className='rounded-full m-auto'
                style={{
                    width: size * 0.75,
                    height: size * 0.75,
                    backgroundColor: color,
                }}
            />
        </div>
    )
}

export default StatusCircle