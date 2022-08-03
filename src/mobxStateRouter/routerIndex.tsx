import * as React from 'react';
import {RootStore} from "./stores/root.store";
import {NotFoundPage} from "./notFound";
import {Page1} from "./page1";
import {Page2} from "./page2";
import {browserHistory, HistoryAdapter, RouterView, RouterContext} from "mobx-state-router";

const rootStore = new RootStore();
const viewMap = {
    page1: <Page1 store={rootStore.routerStore}/>,
    page2: <Page2 store={rootStore.routerStore}/>,
    notFound: <NotFoundPage/>
};

export class RouterIndex extends React.Component<any, any> {
    render() {
        const routerStore = rootStore.routerStore;
        const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
        historyAdapter.observeRouterStateChanges();
        return (
            <RouterContext.Provider value={routerStore}>
                <RouterView viewMap={viewMap}/>
            </RouterContext.Provider>
        );
    };
};