import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class RepoIndex extends Component {
    /*next property to get the initial properties from the eth network before rendering anything on the screen, 
    saves money due to the computational process*/
    static async getInitialProps() {
        const repos = await factory.methods.getDeployedRepos().call();
        return { repos }
    }

    renderRepos() {
        const items = this.props.repos.map(address => {
            return {
                header: address,
                description: (<Link route={`/collections/${address}`}><a>View repo</a></Link>),
                fluid: true
            }
        });
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open repos</h3>
                    <Link route="/collections/new">
                        <a>
                            <Button
                                floated='right'
                                content='Create repo'
                                icon='add circle'
                                primary={true}
                            />
                        </a>
                    </Link>
                    {this.renderRepos()}
                </div>
            </Layout>
        )
    }
}

export default RepoIndex;