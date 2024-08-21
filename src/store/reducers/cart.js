
const initialState = {
    services: [],  // services is initialized as an empty array
    totalQty: 0,
};

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SERVICES':
            return { 
                ...state, 
                services: Array.isArray(action.payload) ? action.payload : [] 
            };

        case 'ADD_SERVICE':
            return {
                ...state,
                services: [...(Array.isArray(state.services) ? state.services : []), action.payload],
                totalQty: state.totalQty + 1,  // Increment totalQty by 1
            };

        case 'DELETE_SERVICE':
            return {
                ...state,
                services: Array.isArray(state.services) 
                    ? state.services.filter(service => service.sku !== action.payload.sku) 
                    : [],
                totalQty: state.totalQty - 1,  // Decrement totalQty by 1
            };

        case 'cart_clear':
            return {
                services: [],
                totalQty: 0,  // Reset totalQty to 0
            };

        default:
            return state;
    }
};
export default serviceReducer;