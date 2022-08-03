// @flow
import * as React from 'react';
import {useRouterStore} from "mobx-state-router";

export class Page2 extends React.Component<any, any> {
    routerStore = this.props;

    render() {
        console.log(this.routerStore)

        return (
            <>
                <h1>Page2</h1>
                <button className={'btn-primary'} onClick={this.handleCLick}>Go to Page 1</button>
                <br/>
                <button className={'btn-primary mt-2'} onClick={this.handleNotFound}>Go to NotFound page</button>

            </>
        );
    };

    handleCLick = () => {
        this.routerStore.store.goTo('page1')
    }
    handleNotFound = () => {
        this.routerStore.store.goTo('notFound')
    }
};