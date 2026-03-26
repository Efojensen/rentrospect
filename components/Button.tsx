const Button = ({activated, label} : {activated: boolean, label: string}) => {
    return (
        <button className={`flex items-center justify-center
            ${activated? 'bg-activatedButton text-white cursor-pointer hover:bg-[#2c332f]' : 'bg-disabledButton text-disabledBtnText'}
            h-12 rounded-lg plusJakartaSans-font text-sm font-semibold capitalize leading-4.5`}
        >
            {label}
        </button>
    )
}

export default Button