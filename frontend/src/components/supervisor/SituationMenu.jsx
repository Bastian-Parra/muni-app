import React , {useState} from "react";
import { situationCategories } from "../../utils/situationCategories.js"

const SituationMenu = ({ onSituationSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSituation, setSelectedSituation] = useState("")

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
        setSelectedSituation("")
    }

    const handleSituationChange = (e) => {
        setSelectedSituation(e.target.value)
        onSituationSelect(e.target.value)
    }

    return (
        <div className="situations-select-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Selecciona una categoría</option>
            {Object.keys(situationCategories).map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
        
        {selectedCategory && (
            <select value={selectedSituation} onChange={handleSituationChange}>
                <option value="">Selecciona una situación</option>
                {situationCategories[selectedCategory].map((situation, index) => (
                    <option key={index} value={situation}>
                        {situation}
                    </option>
                ))}
            </select>
        )}
    </div>
    )
}

export default SituationMenu;

