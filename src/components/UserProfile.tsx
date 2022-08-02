import React, {Component} from 'react'
import {StoreImpl} from "../store";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";


type UserProps = {
    id: number;
    store: StoreImpl;
}

@observer
export class UserProfile extends Component<UserProps> {
    store: any
    isAdmin: boolean = true

    constructor(props: UserProps) {
        super(props)
        this.store = this.props.store
    }

    componentDidMount() {
        this.store.getUserData()
    }

    render() {
        const {loading, data} = this.store.userData;
        return (
            <>
                {loading ? <p>Loading...</p> :
                    <section className="vh-100" style={{backgroundColor: "#f4f5f7"}}>
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-lg-6 mb-4 mb-lg-0">
                                    <div className="card mb-3" style={{borderRadius: ".5rem"}}>
                                        <div className="row g-0">
                                            {this.isAdmin &&
                                            <Link className={'m-2'} to={"/hoc"}>
                                                <Button className={"btn-secondary"}>Show All User & Todos Hoc
                                                    Component</Button></Link>}

                                            <Link className={'m-2'} to={"/useApi"}> <Button
                                                className={"btn-secondary"}>useAPI Component</Button></Link>

                                            <div className="col-md-4 gradient-custom text-center text-white"
                                                 style={{
                                                     borderTopLeftRadius: ".5rem",
                                                     borderBottomLeftRadius: ".5rem"
                                                 }}>
                                                <img
                                                    src={data?.image as string}
                                                    alt="Avatar" className="img-fluid my-5" style={{width: "10rem"}}/>
                                                <h5>{data?.firstName as string}</h5>

                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-4">
                                                    <h6>User Profile</h6>
                                                    <hr className="mt-0 mb-4"/>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Email</h6>
                                                            <p className="text-muted">{data?.email as string}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Phone</h6>
                                                            <p className="text-muted">{data?.phone}</p>
                                                        </div>
                                                    </div>
                                                    <h6>Projects</h6>
                                                    <hr className="mt-0 mb-4"/>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Recent</h6>
                                                            <p className="text-muted">Lorem ipsum</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Most Viewed</h6>
                                                            <p className="text-muted">Dolor sit amet</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">

                                                        <a href="#!">Instagram</a>  &nbsp; &nbsp;

                                                        <a href="#!">Twitter</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </>
        )
    }
}
