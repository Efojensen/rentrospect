interface ButtonProps {
    label: string
    activated?: boolean
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

export const FilledButton = ({label, onClick} : {label: string, onClick: () => void}) => {
    return (
        <button
            className={`flex items-center justify-center h-12 rounded-lg plusJakartaSans-font
                text-sm text-white font-semibold capitalize leading-4.5 bg-[#026571] py-3 flex-1 cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export const GrayedButton = ({label, onClick} : {label: string, onClick: () => void}) => {
    return (
        <button
            className={`flex items-center justify-center h-12 rounded-lg plusJakartaSans-font
                text-sm text-disabledBtnText font-semibold capitalize leading-4.5 bg-disabledButton py-3 flex-1 cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}