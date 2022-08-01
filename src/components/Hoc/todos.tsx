import React, {FunctionComponent} from 'react';
import hoc from "./hoc";
import {FormText} from "reactstrap";

interface OwnProps {
    data: any
}

type Props = OwnProps;

const Todos: FunctionComponent<Props> = ({data}) => {
    return (
        <>{
            data?.map((todo: any) => {
                return (
                    <div key={todo.id}>
                        <FormText>{todo.title}</FormText>
                    </div>
                )
            })
        }
        </>
    );
};

export default hoc(Todos, 'todos');
