import { ActionProps, GlobalState } from ".";
import { FETCH_FEED, FILTER_DATA, SELECT_SOURCE } from "./actions";

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

    case FILTER_DATA: {
      const searchTerm = actions.payload;
      let filteredData = undefined;
      if (searchTerm !== "") {
        filteredData = state.feedSources[state.selectedSource].filter((feed) =>
          JSON.stringify(feed).includes(searchTerm)
        );
      }

      return {
        ...state,
        filteredData,
      };
    }
    default:
      return state;
  }
};

export default feedReducer;
