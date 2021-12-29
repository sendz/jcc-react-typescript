import React, { useState } from "react"

type ContactCardProps = {
    name: string,
    phone: string,
    age: number,
    save?: () => void
}

export const ContactCard = ({name, phone, age, save}: ContactCardProps) => {
    const [isEditing, setEditMode] = useState(false)
    const [_name, setName] = useState(name)
    const [_phone, setPhone] = useState(phone)
    const [_age, setAge] = useState(age)

    return (
        <div>
            <ul>
                <li>Name:{' '}
                    <input 
                        type="text" 
                        onChange={(event) => setName(event.target.value)} 
                        value={_name} 
                        readOnly={!isEditing}
                    />
                </li>
                <li>Phone:{' '}
                    <input 
                        type="tel" 
                        onChange={(event) => setPhone(event.target.value)} 
                        value={_phone} 
                        readOnly={!isEditing}
                        inputMode="tel"
                    />
                </li>
                <li>Age:{' '}
                    <input 
                        type="number" 
                        onChange={(event) => setAge(parseInt(event.target.value))} 
                        value={_age} 
                        readOnly={!isEditing}
                    />
                </li>
            </ul>
            <button onClick={() => setEditMode(!isEditing)}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
    )
}
