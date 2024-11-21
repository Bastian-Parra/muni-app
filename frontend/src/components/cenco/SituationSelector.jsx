import React, { useState } from "react";
import SituationModal from "../modals/SituationModal.jsx";
import { situationCategories } from "../../utils/situationCategories.js";
function SituationSelector({ isOpen, onRequestClose, onSelectSituation }) {
    const [selectedCategory, setSelectedCategory] = useState(null)

    return (
        <SituationModal isOpen={isOpen} onRequestClose={onRequestClose} title={"Seleccione una Situación"}>
            <div className="situation-container">
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Seleccione una categoría</option>
                    {Object.keys(situationCategories).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {selectedCategory && (
                    <>
                        <h3>Tipos de Situaciones</h3>
                        <ul>
                            {situationCategories[selectedCategory].map(situation => (
                                <li key={situation}>
                                    <button onClick={() => onSelectSituation(situation)}>
                                        {situation}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </SituationModal>
    )
}

export default SituationSelector;