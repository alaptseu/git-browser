import React from 'react';
import GitHubRepo from './GitHubRepo';


class Repos extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            repos: [],
            endOfTheLine: false
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.state.endOfTheLine) {
            return;
        }

        this.setState({
            loading: true
        });
        const token = this.props.params.token;
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?page=${this.state.page}&per_page=50&access_token=${token}`)
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    repos: this.state.repos.concat(data),
                    loading: false,
                    page: this.state.page + 1,
                    endOfTheLine: data.length === 0
                });
            }.bind(this));
    }

    renderLoader() {
        if (!this.state.endOfTheLine) {
            return <div>LOADING</div>
        }
        return null;
    }

    render() {
        // console.log(this.state.repos);
        const token = this.props.params.token;
        return (
            <div className="repos-page">
                <h3>{this.props.params.username}'s repositories </h3>
                <ul>
                    {this.state.repos.map(
                        function (eachRepo) {
                            return (
                                <GitHubRepo repo={eachRepo} key={eachRepo.id} token= {token}/>
                            );
                        }
                    )}
                </ul>
            </div>
        );
    }

}

export default Repos;