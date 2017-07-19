import React from 'react';


class GitHubRepo extends React.Component {

    constructor() {
        super();
        this.state = {closedpullrequests: []};
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(`https://api.github.com/repos/${this.props.user.owner.login}/${this.props.user.name}/pulls?state=all&access_token=30f7c95f1dbf7f09e086a3e9543a321c7b1333ca`)
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    closedpullrequests: this.state.closedpullrequests.concat(data),
                });
            }.bind(this));

    }


    render() {
        console.log(this.state.closedpullrequests);

        return (
            <div className="star-button">
                <a href={this.props.user.svn_url} className="eachRepo">
                    {this.props.user.name}
                </a>
                {this.props.user.stargazers_count} &#9733;
                {this.state.closedpullrequests.map(
                    (pullrequest, index) => {
                        return (
                            <form onSubmit={this.handleSubmit}>
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
                                            {pullrequest.state === 'open' &&
                                            <input type="submit" value="Merge" />
                                            }
                                        </div>
                                    </div>
                                </li>
                            </form>
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