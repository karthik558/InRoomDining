import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    latestJob: [],
    categoryList: [
        { id: 1, name: "All Time Favorite", value: "atfav", isChecked: false, },
        { id: 2, name: "Sandwich", value: "sandwich", isChecked: false, },
        { id: 3, name: "Salads", value: "salads", isChecked: false, },
        { id: 4, name: "Burgers", value: "burgers", isChecked: false, },
        { id: 5, name: "Breads", value: "breads", isChecked: false, },
        { id: 6, name: "Pizza", value: "pizza", isChecked: false, },
        { id: 7, name: "Rice", value: "rice", isChecked: false, },
        { id: 8, name: "Deserts", value: "deserts", isChecked: false, },
        { id: 9, name: "Drinks", value: "drinks", isChecked: false, },
        { id: 10, name: "Straters", value: "straters", isChecked: false, },
    ],
}

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        clearCategoryToggle: (state) => {
            state?.categoryList?.map((item) => {
                item.isChecked = false
                return {
                    ...item,
                }
            })
        },
        categoryCheck: (state, { payload }) => {
            state?.categoryList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false
                    } else {
                        item.isChecked = true
                    }
                }
                return {
                    ...item,
                }
            })
        },
    },
})

export const {
    clearCategoryToggle,
    categoryCheck,
} = jobSlice.actions
export default jobSlice.reducer