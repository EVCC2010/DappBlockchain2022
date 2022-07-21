import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Repo from '../../../ethereum/repo';
import AudioRow from "../../../components/audioRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const repo = Repo(address);

        const audioFilesCount = await repo.methods.getAudioFilesCount().call();
        const contributorsCount = await repo.methods.contributorsCount().call();

        const audioFiles = await Promise.all(
            Array(parseInt(audioFilesCount)).fill().map((element, index) => {
                return repo.methods.audioFiles(index).call();
            })
        )
        return { address, audioFiles, audioFilesCount, contributorsCount }
    }

    renderRows() {
        return this.props.audioFiles.map((audioFile, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={audioFile}
                    address={this.props.address}
                    contributorsCount={this.props.contributorsCount}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Audio Files</h3>
                <Link route={`/collections/${this.props.address}/audioUploads/new`}>
                    <a>
                        <Button primary floated='right' style={{ marginBottom: '10px' }}>Add Audio</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Value</HeaderCell>
                            <HeaderCell>Links</HeaderCell>
                            <HeaderCell>Owner</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.audioFilesCount} file(s)</div>
            </Layout>
        )
    }
}

export default RequestIndex;
