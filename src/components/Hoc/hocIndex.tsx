import React, {FunctionComponent} from 'react';
import Users from "./users";
import Todos from "./todos";

interface OwnProps {
}

type Props = OwnProps;

const HocIndex: FunctionComponent<Props> = (props) => {

    return (
        <>
            <Users/>
            <Todos/>
        </>);
};

export default HocIndex;
