import React, { Component } from 'react';
import { Form, Button, Icon, Message, Input } from 'semantic-ui-react';
import Repo from '../../../ethereum/repo';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import axios from "axios";

class AudioNew extends Component {
    state = {
        value: '',
        description: '',
        owner: '',
        links: '',
        loading: false,
        errorMessage: '',
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const repo = Repo(this.props.address);
        const { description, value, links, owner } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await repo.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    links,
                    owner)
                .send({ from: accounts[0] });
            Router.pushRoute(`/collections/${this.props.address}/audioUploads`);
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <Link route={`/collections/${this.props.address}/audioUploads`}>
                    <a>Back</a>
                </Link>
                <h3>Create a new AudioFile</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) =>
                                this.setState({ description: event.target.value })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={(event) => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>File input & upload </label>
                        <Button as="label" htmlFor="file" type="button" animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose a File</Button.Content>
                        </Button>
                    </Form.Field>
                    <Form.Field>
                        <label>File chosen:</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) =>
                                this.setState({ recipient: event.target.value })
                            }
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default AudioNew;
