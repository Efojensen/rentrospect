'use client'

interface ToggleSwitchProps {
    on: boolean
    onToggle?: (value: boolean) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ on, onToggle }) => {
    const handleToggle = () => {
        onToggle?.(!on)
    }

    return (
        <button
            onClick={handleToggle}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300
                ${on ? 'bg-[#036571]' : 'bg-gray-300'}`}
        >
            <div
                className={`h-6 w-6 rounded-full bg-white shadow-md transform
                    transition-all duration-300 ${on ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </button>
    )
}

export default ToggleSwitch