import React, { Component } from 'react';
import { Text } from 'native-base';


export default class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsondata :{}
        }
    }
    componentWillMount() {
        this.props.navigation.getParams(this.setState({jsondata: key}))
    }
    render() {

        return(
            <>
                <Container>
        <Text> {this.state.jsondata}</Text>
                </Container>
            </>
        )
    }
}