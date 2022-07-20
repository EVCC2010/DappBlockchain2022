import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Repo from '../../ethereum/repo';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class RepoShow extends Component {
   static async getInitialProps(props) {
        const repo = Repo(props.query.address);
        const summary = await repo.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            numberOfAudios: summary[2],
            contributorsCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            numberOfAudios,
            minimumContribution,
            contributorsCount
        } = this.props;

        const items = [{
            header: manager,
            meta: 'Address of manager',
            description: 'Manager created this requesto and can request funds',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to participate'
        },
        {
            header: numberOfAudios,
            meta: 'Number of Requests',
            description: 'A request tries to withdraw money from the contract'
        },
        {
            header: contributorsCount,
            meta: 'Number of approvers',
            description: 'Number of people who already have contributed to this repository'
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Balance (ether)',
            description: 'Balance of how much money this collection has'
        }
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Collections Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/collections/${this.props.address}/audioUploads`}>
                                <a>
                                    <Button primary>View AudioFiles</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default RepoShow;