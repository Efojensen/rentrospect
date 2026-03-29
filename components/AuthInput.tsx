import Image from "next/image"
import React, { useRef } from "react"

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

function togglePasswordVisibility2() {
    const passwordInput = document.getElementById('passwordInput2');

    // @ts-expect-error ts does not know this type property
    if (passwordInput!.type === 'password') {
        // @ts-expect-error ts does not know this type property
        passwordInput!.type = 'text'; // Change type to "text" to show password
    } else {
        // @ts-expect-error ts does not know this type property
        passwordInput!.type = 'password';
    }
}

export const AuthPasswordInput2: React.FC<AuthInputProps> = ({
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
                    id='passwordInput2'
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
                    onClick={() => togglePasswordVisibility2()}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export const AuthSmsCodeInput = ({
        label,
        onChange,
        textValue = '',
    }: {
        label: string,
        textValue: string,
        onChange: (value: string) => void,
    }) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const values = textValue.split('').slice(0, 6);

    const handleChange = (value: string, index: number) => {
        const clean = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 1);

        const newValues = [...values];
        newValues[index] = clean;

        const joined = newValues.join('');
        onChange?.(joined);

        // Move to next input
        if (clean && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        // Move back on delete
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className='flex flex-col gap-2 w-full mb-3'>
            <p className='text-sm font-semibold montserrat-font'>{label}</p>

            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                            {/* Add dash in middle */}
                            {i === 3 && (
                                <span className='mx-1 text-lg font-semibold'>-</span>
                            )}

                            <input
                                ref={(el) => (inputsRef.current[i] = el)}
                                type='text'
                                inputMode='numeric'
                                maxLength={1}
                                value={values[i] || ''}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className='w-10 h-12 text-center border rounded-lg border-authInputBorder focus:outline-none focus:ring-2 focus:ring-primary dmSans-font text-lg'
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};