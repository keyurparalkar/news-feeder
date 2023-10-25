import { ActionProps, GlobalState } from ".";
import { FETCH_FEED, SELECT_SOURCE } from "./actions";

const feedReducer = (state: GlobalState, actions: ActionProps): GlobalState => {
  switch (actions.type) {
    case FETCH_FEED: {
      return {
        ...state,
        feedSources: {
          ...state.feedSources,
          [state.selectedSource]: actions.payload,
        },
      };
    }
    case SELECT_SOURCE: {
      return {
        ...state,
        selectedSource: actions.payload,
      };
    }
    default:
      return state;
  }
};

export default feedReducer;
