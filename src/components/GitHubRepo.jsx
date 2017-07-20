import React from 'react';
import Axios from 'axios';


class GitHubRepo extends React.Component {

    constructor() {
        super();
        this.state = {closedpullrequests: []};
        this.fetchData = this.fetchData.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // const token = this.props.params.token;
        console.log('githubrepo ' + this.props.token);
        fetch(`https://api.github.com/repos/${this.props.repo.owner.login}/${this.props.repo.name}/pulls?state=all&access_token=${this.props.token}`)
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    closedpullrequests: this.state.closedpullrequests.concat(data),
                });
            }.bind(this));

    }

    _handleSubmit(event) {
        event.preventDefault();
        // alert('A name was submitted: ' + event);PUT /repos/:owner/:repo/pulls/:number/merge
        Axios.put(`/repos/${this.props.repo.owner.login}/:repo/pulls/:number/merge`)
    }


    render() {
        // console.log(this.state.closedpullrequests);
        return (
            <div className="star-button">
                <a href={this.props.repo.svn_url} className="eachRepo">
                    {this.props.repo.name}
                </a>
                {this.props.repo.stargazers_count} &#9733;
                {this.state.closedpullrequests.map(
                    (pullrequest, index) => {
                        return (
                                <li key={index}>
                                    <div className="eachPullRequest">
                                        <div>
                                            {pullrequest.state === 'open' &&
                                            <a href={pullrequest.url} className="openPullRequest"
                                               target="_blank">Pull Request {pullrequest.title} is {pullrequest.state}</a>
                                            }
                                            {pullrequest.state === 'closed' &&
                                            <a href={pullrequest.url} className="closedPullRequest"
                                               target="_blank">Pull Request {pullrequest.title} is {pullrequest.state}
                                                at {pullrequest.closed_at}</a>
                                            }
                                        </div>
                                    </div>
                                </li>
                        );
                    }
                )
                }
            </div>
        );
    }
}
;

export default GitHubRepo;