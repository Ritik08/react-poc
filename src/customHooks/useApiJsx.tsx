import React, {FunctionComponent, useEffect, useState} from 'react';
import {Method, useApi} from "./useApi";
import MobxPractice, {MobxPracticeState} from "../components/MobxPractice";

interface OwnProps {
}

type Props = OwnProps;

const UseApiJsx: FunctionComponent<Props> = (props) => {
    const [quotes, setQuotes] = useState<any>();
    const [error, setError] = useState<string>();
    const url = 'https://dummyjson.com/quotes';
    const {loading, response} = useApi(url, Method.get)
    useEffect(() => {
        if (response && response !== null) {
            (typeof (response) === 'string') ? setError(response) : setQuotes(response?.res.quotes)
        }
    }, [response]);
    return (
        <>
            <MobxPractice store={MobxPracticeState}/>
            <div className={'d-flex p-4 flex-wrap'}>
                {quotes?.map((quote: any) => {
                    return (
                        <div className="card m-1" key={quote.id}
                             style={{width: "15rem", height: '15rem'}}>
                            <div className="card-body">
                                <div style={{
                                    height: '7rem',
                                    overflow: 'hidden',
                                    textOverflow: "ellipsis"
                                }}>{quote.quote}</div>
                                <h6 className="card-title">Quote Author: {quote.author}</h6>
                                <a href="#" className="btn btn-primary">About Quote</a>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}


export default UseApiJsx;
