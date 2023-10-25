import { createContext, Dispatch, useReducer } from "react";
import { Feeds, Source } from "../types/feeds";
import feedReducer from "./reducer";

export type GlobalState = {
  feedSources: Feeds | [];
  selectedSource: Source | undefined;
};

export const initialState: GlobalState = {
  feedSources: [],
  selectedSource: undefined,
};

export type ActionProps = {
  type: string;
  payload?: any[] | any;
};

// Create Contexts:
export const FeedContext = createContext(initialState);
export const FeedDispatchContext = createContext<Dispatch<ActionProps>>(
  () => undefined
);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(feedReducer, initialState);

  return (
    <FeedContext.Provider value={state}>
      <FeedDispatchContext.Provider value={dispatch}>
        {children}
      </FeedDispatchContext.Provider>
    </FeedContext.Provider>
  );
};
