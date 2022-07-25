import React, { Component } from 'react';
import { Form, Button, Icon, Message, Input } from 'semantic-ui-react';
import Repo from '../../../ethereum/repo';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
//import Storage from '../../../external/storage';

class AudioNew extends Component {
    state = {
        value: '',
        description: '',
        owner: '',
        links: '',
        fileName: '',
        loading: false,
        errorMessage: '',
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

      fileChange = e => {
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name },
          () => {
            console.log(
              "File chosen --->",
              this.state.file,
              console.log("File name  --->", this.state.fileName)
            );
          }
        );
      };



    onSubmit = async (event) => {
        event.preventDefault();

        const repo = Repo(this.props.address);
        const { description, value, links, owner } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        //Store.gogogo();
        //Storage.uploadAudio(this.state.fileName);
        //transcription();
        //updloadMetadata();
        
        try {
            const accounts = await web3.eth.getAccounts();
            await repo.methods
                .createAudioFile(
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
                        <input
                          type="file"
                          id="file"
                          hidden
                         onChange={this.fileChange}
                        />
                        <Form.Input
                          fluid
                          label="File Chosen: "
                          placeholder="Use the above bar to browse your file system"
                          readOnly
                          value={this.state.fileName}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                          fluid
                          label="Owner Address:  "
                          placeholder="Type the owner address"
                          value={this.state.owner}
                          onChange={(event) => this.setState({ owner: event.target.value })}
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
