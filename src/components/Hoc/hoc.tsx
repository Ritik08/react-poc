import React from "react";
import {Input} from "reactstrap";

const hoc = (WrappedComponent: any, entity: any) => {
    return class extends React.Component<any, any> {
        state = {
            data: [],
            term: ""
        }

        componentDidMount() {
            const fetchData = async () => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/${entity}`)
                const res = await response.json()
                this.setState({...this.state, data: res})
            }
            fetchData();
        }


        render() {
            let {term, data} = this.state
            const filteredData = data.slice(0, 10).filter((d) => {
                if (entity === 'users') {
                    const {name}: any = d
                    return name.indexOf(term) >= 0;
                } else {
                    const {title}: any = d
                    return title.indexOf(term) >= 0;
                }
            });
            return (
                <>
                    <h2>{entity}</h2>
                    <Input
                        type={"text"}
                        value={term}
                        onChange={(e) => this.setState({...this.state, term: e.target.value})
                        }
                    />
                    <WrappedComponent data={filteredData}/>
                </>
            )


        }
    }
}
export default hoc;