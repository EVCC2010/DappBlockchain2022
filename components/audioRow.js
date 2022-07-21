import React, { Component } from "react";
import { Table, Button } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Repo from '../ethereum/repo';

class AudioRow extends Component {

    render() {
        const { Row, Cell } = Table;
        const { id, audioFile } = this.props;

        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{audioFile.description}</Cell>
                <Cell>{web3.utils.fromWei(audioFile.value, 'ether')}</Cell>
                <Cell>{audioFile.recipient}</Cell>
            </Row >
        )
    }
}

export default AudioRow;