import React, { Component } from 'react';
import { Container, Text } from 'native-base';

export default class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsondata :''
        }
    }

    componentWillMount() {
        // this.setState({jsondata: this.props.navigation.getParam('data')})
       this.setState({jsondata:JSON.stringify(this.props.route.params.jsondata)});
       this.forceUpdate();
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