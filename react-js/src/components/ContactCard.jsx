import React, { useState } from "react"
import PropTypes from "prop-types"

function ContactCard({name, phone, age}) {
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
                        onChange={(event) => setAge(event.target.value)} 
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

ContactCard.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    save: PropTypes.func
}

export default ContactCard

