'use client'
import { addPrice } from "@/features/filterSlice"
import { useDispatch, useSelector } from "react-redux"

const PriceFilter = () => {
    const { price } = useSelector((state) => state.filter) || {}
    const dispatch = useDispatch()

    // price handler
    const priceHandler = (e, id) => {
        dispatch(addPrice(e.target.value))
    }

    return (
        <ul className="switchbox">
            {price?.map((item) => (
                <li key={item.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={item.isChecked}
                            value={item.value}
                            onChange={(e) => priceHandler(e, item.id)}
                        />
                        <span>{item.name}</span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default PriceFilter
