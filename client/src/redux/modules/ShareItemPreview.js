// action type
const RESET_IMAGE = 'RESET_IMAGE';
const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM';
const RESET_NEW_ITEM = 'RESET_NEW_ITEM';

// action creator
export const resetImage = () => ({
    type: RESET_IMAGE
  });

export const updateNewItem = (item) => ({
    type: UPDATE_NEW_ITEM,
    payload: item
  });

export const resetNewItem = () => ({
    type: RESET_NEW_ITEM
  });


// initial state of app
const initialState = {
    title:'Name your item',
    description:'Describe your item',
    tags:[],
    imageurl: 'https://dummyimage.com/350x250/ded71b/141103&text=Select+your+image',
    created: new Date(),
    itemowner: {}
};

// reducer
  export default (state = initialState, action) => {
    switch(action.type){
        case RESET_IMAGE: {
            return { ...state, imageurl: initialState.imageurl }
        }

        case UPDATE_NEW_ITEM: {
            return { ...state, ...action.payload }
        }

        case RESET_NEW_ITEM: {
            return { ...initialState }
        }
        
        default: {
            return state;
        }
    }
}
