import { ActionProps, GlobalState } from ".";
import { FETCH_FEED, FILTER_DATA, SELECT_SOURCE } from "./actions";

const feedReducer = (state: GlobalState, actions: ActionProps): GlobalState => {
  switch (actions.type) {
    case FETCH_FEED: {
      if (actions.payload.hasOwnProperty("feedSource")) {
        const { transformedResp, feedSource } = actions.payload;
        return {
          ...state,
          feedSources: {
            ...state.feedSources,
            [feedSource]: transformedResp,
          },
        };
      } else {
        return {
          ...state,
          feedSources: {
            ...state.feedSources,
            [state.selectedSource]: actions.payload,
          },
        };
      }
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

      console.log({
        searchTerm,
        selectedSource: state.selectedSource,
        filteredData,
      });
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
