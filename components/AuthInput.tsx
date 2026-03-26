import Image from "next/image"

interface AuthInputProps {
    icon: string
    label: string
    hintText?: string
    options?: string[]
    textValue?: string
    onChange?: (value: string) => void
}

export const AuthInput: React.FC<AuthInputProps> = ({
    icon,
    label,
    hintText,
    textValue,
    onChange,
}) => {
    return (
        <div className='flex flex-col gap-1 w-full mb-3'>
            <p className='text-sm font-semibold leading-4.5 montserrat-font'>{label}</p>
            <div className='flex gap-2 items-center border rounded-lg border-authInputBorder h-12.5 py-2 px-3'>
                <Image
                    src={icon}
                    alt={icon}
                    width={16}
                    height={16}
                />
                <input
                    type='text'
                    placeholder={hintText}
                    value={textValue || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    className='w-full border-none focus:outline-none focus:ring-0 dmSans-font'
                />
            </div>
        </div>
    )
}

function togglePasswordVisibility() {
        const passwordInput = document.getElementById('passwordInput');

        // @ts-expect-error ts does not know this type property
        if (passwordInput!.type === 'password') {
            // @ts-expect-error ts does not know this type property
            passwordInput!.type = 'text'; // Change type to "text" to show password
        } else {
            // @ts-expect-error ts does not know this type property
            passwordInput!.type = 'password';
        }
    }

export const AuthPasswordInput: React.FC<AuthInputProps> = ({
    icon,
    label,
    hintText,
    onChange,
    textValue,
}) => {
    return (
        <div className='flex flex-col gap-1 w-full mb-3'>
            <p className='text-sm font-semibold leading-4.5 montserrat-font'>{label}</p>
            <div className='flex gap-2 items-center border rounded-lg border-authInputBorder h-12.5 py-2 px-3'>
                <Image
                    src={icon}
                    alt={icon}
                    width={16}
                    height={16}
                />
                <input
                    type='password'
                    id='passwordInput'
                    placeholder={hintText}
                    value={textValue || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    className='w-full border-none focus:outline-none focus:ring-0 dmSans-font'
                />
                <Image
                    width={16}
                    height={16}
                    src={'/svgs/auth/eye.svg'}
                    alt={'red eye to obscure text'}
                    onClick={() => togglePasswordVisibility()}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

