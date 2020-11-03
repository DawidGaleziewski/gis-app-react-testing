import React from "react";

import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
});
const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

const KepplerMap = () => {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
};

const Map = () => {
  const dispatch = useDispatch();
  const { data } = useSwr("covid", async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
    );

    const data = await response.json();
    return data;
  });

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "COVID",
              id: "covid19",
            },
            data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: {},
        })
      );
    }
  }, [dispatch, data]);

  console.log("data:", data);
  return (
    <KeplerGl
      id="covid"
      mapboxApiAccessToken={
        "pk.eyJ1IjoiZGF3aWRnYWxlemlld3NraWRldiIsImEiOiJja2gwbjM5bDEwYnk1MzFvM3N4eXpvbm9lIn0.Hb4_LeKDTKi6rVZRniwzng"
      }
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default KepplerMap;
