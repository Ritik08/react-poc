import React, {FunctionComponent} from 'react';
import hoc from "./hoc";
import {FormText} from "reactstrap";

interface OwnProps {
    data: any
}

type Props = OwnProps;

const Users: FunctionComponent<Props> = ({data}) => {

    return (
        <>{
            data?.map((user: any) => {
                return (
                    <div key={user.id}>
                        <FormText>{user.name}</FormText>
                    </div>
                )
            })
        }
        </>
    );
};

export default hoc(Users, "users");
