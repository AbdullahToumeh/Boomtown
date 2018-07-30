import { combineReducers } from 'redux';
import ShareItemPreviewReducer from './modules/ShareItemPreview';

export default combineReducers({
    shareItemPreview: ShareItemPreviewReducer,
});