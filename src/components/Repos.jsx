import React from 'react';
import Infinite from 'react-infinite';
import GitHubRepo from './GitHubRepo';
import {Link} from 'react-router';


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

        fetch(`https://api.github.com/users/${this.props.params.username}/repos?page=${this.state.page}&per_page=50&access_token=30f7c95f1dbf7f09e086a3e9543a321c7b1333ca`)
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
        console.log(this.state.repos);
        return (
            <div className="repos-page">
                <h3>{this.props.params.username}'s repositories </h3>
                <ul>
                    {this.state.repos.map(
                        function (eachRepo) {
                            return (
                                <GitHubRepo user={eachRepo} key={eachRepo.id}/>
                            );
                        }
                    )}
                </ul>
            </div>
        );
    }

}

export default Repos;