import {useRouterStore} from "mobx-state-router";
import * as React from "react";

export function NotFoundPage() {
    const routerStore = useRouterStore();
    const handleCLick = () => {
        routerStore.goTo('page1');
    }
    return (
        <div>
            <h1>Page Not Found</h1>
            <button className={'btn-primary'} onClick={handleCLick}>Go to Page 1</button>
        </div>
    );


}
