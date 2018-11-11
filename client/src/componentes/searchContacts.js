import React from 'react';
import SearchContactContainer from '../containers/Contacts/searchContact';
import { Button } from 'semantic-ui-react';
import AddContact from "../containers/Contacts/addContact";
import { Mutation } from 'react-apollo';

class InviteCard extends React.Component {

    state = {
        invited: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.setState({
            invited: this.props.requested
        })
    }

    invite(id) {
        this.props.mutation({
            variables: {
                requestedUserId: id
            }
        }).then(pX => {
            this.setState({
                invited: true
            })
        }, (error) => {
            this.setState({
                invited: false
            })
        })

    }

    render() {
        var btnInvited = !this.state.invited ? <div> <i className="plus icon"></i>Invite</div> : <div><i className="x icon"></i>Cancel</div>
        return (<div className="card" key={this.props.id}>
            <div className="content">
                <div className="header">
                    {this.props.userName}
                </div>
                <div className="description">
                    {this.props.email}
                </div>
            </div>
            <div className="extra content">
                <button className="ui fluid blue button" onClick={this.invite.bind(this, this.props.id)}>
                    {btnInvited}
                </button>
            </div >
        </div>)
    }
}

class SearchContacts extends React.Component {

    state = {
        filter: ''
    }

    constructor(props) {
        super(props);
    }

    inputHandle(evt) {
        var target = evt.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.setState({
            [name]: value
        });
        this.props.refetch({
            userName: value
        });
    }

    render() {
        var result;
        if (this.props.loading)
            result = <div>Loading...</div>
        else if (this.props.error)
            result = <div>Erro...</div>;
        else
            result = this.props.data.users.map(pX => <AddContact key={pX.id}>{(mutation, { ...props }) => <InviteCard mutation={mutation} {...props} {...pX} />}</AddContact>);
        return (
            <div>
                <div className="ui center aligned segment">
                    <div className="field">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" name="filter" type="text" value={this.state.filter} onChange={this.inputHandle.bind(this)}
                                    placeholder="Find Users..." />
                                <i className="search icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="results">
                    <div className="ui cards">
                        {result}
                    </div>
                </div>

            </div >
        );
    }
}


export default () => <SearchContactContainer>{({ ...props }) => <SearchContacts {...props} />}</SearchContactContainer>