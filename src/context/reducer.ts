import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ActionProps, GlobalState } from ".";
import { FETCH_FEED, FILTER_DATA, SELECT_SOURCE } from "./actions";
dayjs.extend(isBetween);

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
        filteredData: [],
      };
    }

    case FILTER_DATA: {
      const { searchTerm, dateStrings } = actions.payload;
      let filteredData = undefined;
      if (searchTerm !== "") {
        filteredData = state.feedSources[state.selectedSource].filter((feed) =>
          JSON.stringify(feed).includes(searchTerm)
        );
      }

      if (dateStrings) {
        filteredData = state.feedSources[state.selectedSource].filter((feed) =>
          dayjs(feed.createdAt).isBetween(dateStrings[0], dateStrings[1])
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
