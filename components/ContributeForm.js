import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Repo from '../ethereum/repo';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const repo = Repo(this.props.address);
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await repo.methods.contribute().send({
                from: accounts[0], value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.replaceRoute(`/collections/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false, value: '' })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Contribution to Join</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>
                <Message error header='Oops!' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Join!!
                </Button>
            </Form>
        )
    }
}
export default ContributeForm;