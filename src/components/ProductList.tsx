import React, {FunctionComponent, useEffect} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle
} from "reactstrap";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {StoreImpl} from "../store";
import useDeleteProduct from "../customHooks/useDeleteProduct";

interface OwnProps {
    store: StoreImpl;
}

type Props = OwnProps;

const ProductList: FunctionComponent<Props> = observer((props) => {
        useEffect(() => {
                props.store.getUserData()
            },
            [props.store]);

        const handleAddToCart = (product: any) =>
            props.store.addProductsToCart({id: product?.id, quantity: product.quantity})

        const {loading, data} = props?.store?.products
        const {firstName, lastName} = props?.store?.userData?.data
        // const {id, isDeleted} = useDeleteProduct()
        // console.log("id:", id, 'isDeleted', isDeleted)
        // console.log(JSON.parse(JSON.stringify(data)))
        return (
            <>
                <div className={'products p-4'}>
                    <div className="container mb-4">
                        <div className="row gy-3">
                            <div className="col gy-3 align-text-bottom">
                                <h5>Welcome <strong>{firstName ? firstName : "John"} {lastName ? lastName : "Doe"}!</strong>
                                </h5>
                            </div>
                            <div className="col gy-3">
                            </div>
                            <div className="col gy-3">
                                <Link to={'userCart/2'}><Button className={"btn-secondary me-2"}>Bob's
                                    Cart</Button></Link>
                                <Link to={"myProfile/2"}><Button className={"btn-secondary"}>Bob's Profile</Button></Link>
                                <Link to={'routerIndex'}><Button className={"btn-secondary ms-2"}>Mobx
                                    Routing</Button></Link>

                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row gy-3">
                            {loading ? <p>Loading</p> :
                                data?.map((item: any) => {
                                    return (
                                        <div key={item.id} className="col-sm">
                                            <Card style={{width: '20rem', height: '28rem', boxSizing: 'border-box'}}>
                                                <CardImg
                                                    alt="Card image cap"
                                                    src={item.images[0]}
                                                    top
                                                    width={'200px'}
                                                    height={'200px'}
                                                    style={{objectFit: 'contain'}}
                                                />
                                                <CardBody>
                                                    <CardTitle style={{
                                                        overflow: "hidden",
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        <strong>Product Name:</strong> {item.title}
                                                    </CardTitle>
                                                    <CardText>
                                                        <strong>Price:</strong>{item.price}
                                                    </CardText>
                                                    <CardText>
                                                        <strong>Category:</strong> {item.category}
                                                    </CardText>
                                                    <CardText style={{
                                                        height: '3rem',
                                                        overflow: "hidden",
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        <strong>Description:</strong> {item.description}
                                                    </CardText>
                                                    <strong>ProductID:</strong> {item.id}
                                                    <Button className={'ms-5'}
                                                            onClick={() => handleAddToCart({id: item.id, quantity: 1})}>
                                                        Add To Cart
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
    })
;

export default ProductList;

function toJs(data: any[]): any {
    throw new Error('Function not implemented.');
}

