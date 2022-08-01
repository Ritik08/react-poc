import React, {FunctionComponent} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle
} from "reactstrap";
import {StoreImpl} from "../store";
import {observer} from "mobx-react";

interface OwnProps {
    store: StoreImpl;
}

type Props = OwnProps;

const UserCart: FunctionComponent<Props> = observer((props) => {
    return (
        <>
            <div className={'userCart p-3'}>
                <div className="container mb-5">
                    <div className="row gy-3">
                        <div className="col">
                            <strong>Bob's Cart</strong>
                        </div>
                        <div className="col">
                            {/*{?.carts[0]?.products?.totalProducts}*/}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row gy-3">
                        {props.store.cartData?.carts[0]?.products?.map((item: any) => {
                            return (
                                <div key={item.id} className="col-sm">
                                    <Card style={{height: '15rem', maxWidth: "17.5rem"}}>
                                        <CardBody>
                                            <CardTitle style={{
                                                overflow: "hidden",
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                <strong>Product Name:</strong> {item.title}
                                            </CardTitle>
                                            <CardText>
                                                <strong>Id:</strong>{item.id}
                                            </CardText>
                                            <CardText>
                                                <strong>Price:</strong>{item.price}
                                            </CardText>
                                            <CardText>
                                                <strong>Quantity:</strong> {item.quantity}
                                            </CardText>

                                            <Button onClick={() => props.store.deleteItemFromCart(item.id)}>
                                                Delete
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        })
                        }
                    </div>

                </div>
            </div>
        </>

    );
});

export default UserCart;
