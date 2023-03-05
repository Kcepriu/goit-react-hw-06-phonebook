const { createSlice } = require('@reduxjs/toolkit');

const filterInitialState = {
  request: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilter(state, action) {
      state.request = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
