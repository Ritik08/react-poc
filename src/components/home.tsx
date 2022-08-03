import React, {FunctionComponent, useEffect} from 'react';
import '../styles/home.css'

import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react";
import {Toast, ToastBody, ToastHeader} from "reactstrap";

const Home: FunctionComponent<any> = observer((props) => {
    const {categories} = props?.store?.allCategories

    useEffect(() => {
        props.store.getCategoriesData()
        props.store.getDisplayedProducts()
    }, [props.store]);

    const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.store.searchProducts(e.target.value)
    }
    const handleCategorySelection = (category: string) => {
        props.store.getProductsFromSelectedCategory(category)
    }

    return (
        <>
            <section className="page">
                <header>
                    <nav className="navbar navbar-dark bg-dark w-100 pe-5">
                        <a className="navbar-brand ms-5">Noovosoft Poc</a>
                        <form className="form-inline">
                            <input className="form-control me-5" onChange={(e) => searchProduct(e)} type="search"
                                   placeholder="Search" aria-label="Search"/>
                        </form>
                    </nav>

                </header>
                <nav>
                    <div className="wrapper h-100 w-100 pt-4 ">
                        <nav id="sidebar" className={'ms-3'}>
                            <div className="sidebar-header ">
                                <h5>Main Menu</h5>
                            </div>

                            <p className={'cursor-pointer allCategories'}
                               onClick={() => props.store.getDisplayedProducts()}>All
                                Categories</p>
                            <hr/>
                            <ul className={'list-unstyled components'}>
                                {categories ? categories.map((category: any) => {
                                        return (<li className={'list-unstyled cursor-pointer categories'} key={category}
                                                    onClick={() => handleCategorySelection(category)}>
                                            {category}
                                            <hr/>
                                        </li>)
                                    })
                                    : <p>Categories Not Loaded</p>

                                }
                            </ul>
                        </nav>
                    </div>
                </nav>
                <main style={{backgroundColor: 'rgb(244, 245, 247)'}}>
                    <div className="p-3 my-2 rounded"
                         style={{position: "absolute", top: '6rem', right: 0, zIndex: 9999}}>
                        <Toast className={'bg-white'} isOpen={props.store.toastStatus}>
                            <ToastHeader>
                                Cart Updated
                            </ToastHeader>
                            <ToastBody>
                                {props.store.cartUpdates.msg}
                            </ToastBody>
                        </Toast>
                    </div>
                    <Outlet/>
                </main>
            </section>


        </>
    );
})
export default Home;
