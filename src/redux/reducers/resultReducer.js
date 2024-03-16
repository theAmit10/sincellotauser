import { createReducer } from "@reduxjs/toolkit";


export const resultReducer = createReducer({
    loading:false,
    results: [],
    result: {}
},(builder)=>{
    
    builder.addCase("getAllResultRequest",(state) => {
        state.loading = true;
    })
    .addCase("getResultRequest",(state) => {
        state.loading = true;
    })
    
    builder.addCase("getAllResultSuccess",(state,action) => {
        state.loading = false;
        state.dates = action.payload;
    })
    .addCase("getResultSuccess",(state,action) => {
        state.loading = false;
        state.date = action.payload;
    })
    
    builder.addCase("getAllResultFail",(state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("getResultFail",(state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
   
    
    builder.addCase("clearError",(state) => { 
        state.error = null
    });
    builder.addCase("clearMessage",(state) => { 
        state.results = []
    });

})