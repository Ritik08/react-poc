import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

//
// interface OwnProps {
//     data: any
// }

// type Props = OwnProps;

const Home: FunctionComponent<any> = () => {
    const [data, setData] = useState<any>();
    const getData = async () => {
        const res = await fetch('https://dummyjson.com/products');
        const response = await res.json();
        console.log(response);
        setData(response.products);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <CardGroup>
                {data?.map((item: any) => {
                    return (
                        <Card key={item.id}>
                            <CardImg
                                alt="Card image cap"
                                src={item.images[0]}
                                top
                                width={'200px'}
                            />
                            <CardBody>
                                <CardTitle>
                                    <strong>Product Name:</strong> {item.title}
                                </CardTitle>
                                <CardSubtitle>
                                </CardSubtitle>
                                <CardText>
                                    <strong>Price:</strong>{item.price}
                                </CardText>
                                <CardText>
                                    <strong>Category:</strong> {item.category}
                                </CardText>
                                <CardText>
                                    <strong>Description:</strong> {item.description}
                                </CardText>
                                <Button>
                                    Add To Cart
                                </Button>
                                <Button className='ml-5'>
                                    Remove from cart
                                </Button>
                            </CardBody>
                        </Card>
                    )
                })
                }
            </CardGroup>
        </>
    );
}
export default Home;
