import React, {Component} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";

export const MobxPracticeState: any = observable({
    count: 0
})
MobxPracticeState.increment = function () {
    this.count++;
}
MobxPracticeState.decrement = function () {
    this.count--;
}

@observer
class MobxPractice extends Component<any, any> {
    render() {
        return (
            <div className={'m-2 ms-5'}>
                Counter: {this.props.store.count}<br/>
                <button className={"me-3"} onClick={this.handleInc}> +</button>
                <button onClick={this.handleDec}> -</button>
            </div>
        )
    }

    handleInc = () => {
        MobxPracticeState.increment()
    }
    handleDec = () => {
        MobxPracticeState.decrement()
    }
}

export default MobxPractice;
