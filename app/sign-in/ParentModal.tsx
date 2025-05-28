'use client';
import React, { useState } from "react"
import Modal from "./Modal";

const ParentModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default ParentModal