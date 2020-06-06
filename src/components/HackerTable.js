import React, { Component } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'reactstrap';

class HackerTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentsData: null,
            pageNo: 1,
            disabled: true
        }
    }

    //api call
    handleAPICall() {
        axios.get(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNo}`)
            .then(response => {
                const commentsData = response.data.hits;
                const storageNews = JSON.parse(localStorage.getItem("updatedNews"));
                //if updated news in localstorage
                if (storageNews && storageNews.hasOwnProperty(this.state.pageNo)) {
                    let getComments = storageNews[this.state.pageNo];
                    this.setState({ commentsData: getComments });
                } else {
                    this.setState({ commentsData });
                }
            });
    }

    componentDidMount() {
        this.handleAPICall();
    }

    //on click of up vote button action
    handleUpVote(e, id) {
        let commentsVal = this.state.commentsData;

        commentsVal.forEach((item) => {
            if (item.objectID === id) {
                return item.points = ++item.points;
            }
        });
        this.setState({ commentsData: commentsVal });

        this.handleVoteHide(commentsVal);
    }

    //on click of hide button action
    handleHideNews(e, id) {
        let commentsVal = this.state.commentsData.filter(item => item.objectID !== id);
        this.setState({ commentsData: commentsVal });
        this.handleVoteHide(commentsVal);
    }

    //on click of vote button action
    handleVoteHide(commentsVal) {
        let updatedNews = {};
        let storageNews = localStorage.getItem("updatedNews");
        if (storageNews) {
            updatedNews = JSON.parse(storageNews);
        }
        updatedNews[this.state.pageNo] = commentsVal;

        localStorage.setItem("updatedNews", JSON.stringify(updatedNews));
    }

    //handle upvote and hide  
    handlePrevious = () => {
        this.setState(prevState => {
            return { pageNo: prevState.pageNo - 1 }
        });

        setTimeout(() => {
            this.handleAPICall();

            if (this.state.pageNo === 1) {
                this.setState({ disabled: true });
            }
        }, 10);
    }

    //on click of next button action
    handleNext = () => {
        this.setState(prevState => {
            return { pageNo: prevState.pageNo + 1, disabled: false }
        });

        setTimeout(() => {
            this.handleAPICall();
        }, 10);
    }

    //on click clear storage
    handleClearStorage() {
        localStorage.clear();
        window.location.reload(false);
    }

    render() {
        if (this.state.commentsData) {
            return (
                <div className="hackerTable">
                    <Table striped size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Comments</th>
                                <th>Vote Count</th>
                                <th>UpVote</th>
                                <th>News Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.commentsData.map((item) => {
                                return <tr key={item.objectID}>
                                    <td>{item.num_comments}</td>
                                    <td>{item.points}</td>
                                    <td><button onClick={(e) => this.handleUpVote(this, item.objectID)}><div className="upvote"></div></button></td>
                                    <td>
                                        <b>{item.title} </b>
                                        ({item.url ? item.url.split('/')[2] : " "})
                                        by <b>{item.author}</b> | {item.created_at ? item.created_at.split('T')[0] : " "}
                                        <button onClick={(e) => this.handleHideNews(this, item.objectID)}>[ hide ]</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <div className="prevNext">
                        <button onClick={this.handlePrevious} disabled={this.state.disabled}>Previous</button> |
                        <button onClick={this.handleNext}>Next</button> |
                        <button onClick={this.handleClearStorage}>Remove storage values</button>
                    </div>
                </div>
            );
        } else {
            return (
                <Spinner style={{ width: '3rem', height: '3rem' }} />
            );
        }
    }
}

export default HackerTable;