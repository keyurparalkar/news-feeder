import { ActionProps, GlobalState } from ".";
import { SELECT_SOURCE } from "./actions";

const feedReducer = (state: GlobalState, actions: ActionProps): GlobalState => {
  switch (actions.type) {
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
