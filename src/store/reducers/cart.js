const initialState = {
    services : [],
    grandTotal : 0,
}

const serviceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SERVICES':
            return {...state, services: action.payload}
        case 'ADD_SERVICE':
            return {...state, services: [...state.services, action.payload], grandTotal: state.grandTotal + action.payload.price}
            case "cart_clear":
                return {
                  products: [],
                  totalQty: 0,
                };
        case 'DELETE_SERVICE':
            return {...state, services: state.services.filter(service => service.id !== action.payload), grandTotal: state.grandTotal - action.payload.price}
        default:
            return state
    }

}

export default serviceReducer;