import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState : {
        searchBarToggle : false,
        loginToggle : false,
        isDiffRes : false,
        similarResDish : {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : ""
        }
    },
    reducers : {
        toggleSearchBar : (state) => {
            state.searchBarToggle = !state.searchBarToggle
        },
        toggleLogin : (state) => {
            state.loginToggle = !state.loginToggle
        },
        toggleDiffRes : (state) => {
            state.isDiffRes = !state.isDiffRes
        },
        setSimilarResDish : (state , action) => {
            state.similarResDish = action.payload
        },
        resetSimilarResDish : (state) => {
            state.similarResDish = {
                isSimilarResDishes : false,
                city : "",
                resLocation : "",
                resId : "",
                itemId : ""
            }
        }
    }
})

export const { toggleSearchBar , resetSimilarResDish , toggleLogin , toggleDiffRes , toggleisSimilarResDishes , setSimilarResDish } = toggleSlice.actions

export default toggleSlice.reducer