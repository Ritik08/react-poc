// @flow
import * as React from 'react';

export class Page1 extends React.Component<any, any> {
    routerStore = this.props;

    render() {
        return (<>
                <h1>Page1</h1>
                <button className={'btn-primary'} onClick={this.handleCLick}>Go to Page 2</button>
            </>
        );
    };

    handleCLick = () => {
        this.routerStore.store.goTo('page2');
    }
};