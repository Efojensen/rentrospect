interface ButtonProps {
    label: string
    activated: boolean
    onClick?: () => void
}

const Button:React.FC<ButtonProps> = ({label, activated, onClick}) => {
    return (
        <button className={`flex items-center justify-center
            ${activated? 'bg-activatedButton text-white cursor-pointer hover:bg-[#2c332f]' : 'bg-disabledButton text-disabledBtnText'}
            h-12 rounded-lg plusJakartaSans-font text-sm font-semibold capitalize leading-4.5`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button