import React, { Component } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'reactstrap';
import Chart from './Chart';

class HackerTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentsData: null,
            pageNo: 1,
            disabled: true,
            chartData: null,
            error: null
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
                this.generateChartData(this.state.commentsData);
            })
            .catch(error => this.setState({ error }));
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

        this.updateLocalStorage(commentsVal);
        this.generateChartData(commentsVal);
    }

    //on click of hide button action
    handleHideNews(e, id) {
        let commentsVal = this.state.commentsData.filter(item => item.objectID !== id);
        this.setState({ commentsData: commentsVal });
        this.updateLocalStorage(commentsVal);
        this.generateChartData(commentsVal);
    }

    //on click of vote button action
    updateLocalStorage(commentsVal) {
        let updatedNews = {};
        let storageNews = localStorage.getItem("updatedNews");
        if (storageNews) {
            updatedNews = JSON.parse(storageNews);
        }
        updatedNews[this.state.pageNo] = commentsVal;

        localStorage.setItem("updatedNews", JSON.stringify(updatedNews));
    }

    //generate chart data
    generateChartData(commentsVal) {
        let aryVal = [];

        aryVal = commentsVal.map(item => {
            let chartObj = {};
            chartObj.votes = item.points;
            chartObj.ID = item.objectID;
            return chartObj;
        });

        this.setState({ chartData: aryVal });
    }

    //handle upvote and hide  
    handlePrevious = () => {
        this.setState(prevState => {
            return { pageNo: prevState.pageNo - 1 }
        });
    }

    //on click of next button action
    handleNext = () => {
        this.setState(prevState => {
            return { pageNo: prevState.pageNo + 1, disabled: false }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageNo !== this.state.pageNo) {
            this.handleAPICall();

            if (this.state.pageNo === 1) {
                this.setState({ disabled: true });
            }
        }
    }

    //on click clear storage
    handleClearStorage() {
        localStorage.clear();
        window.location.reload(false);
    }

    render() {
        if (this.state.commentsData) {
            return (
                <>
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
                                        <td>
                                            <button onClick={(e) => this.handleUpVote(this, item.objectID)} role="button" aria-describedby="upvoteDesc">
                                                <div className="upvote"></div>
                                            </button>
                                            <p id="upvoteDesc" className="hide">Increase the vote count</p>
                                        </td>
                                        <td>
                                            <b>{item.title} </b>
                                            ({item.url ? item.url.split('/')[2] : " "})
                                            by <b>{item.author}</b> | {item.created_at ? item.created_at.split('T')[0] : " "}
                                            <button onClick={(e) => this.handleHideNews(this, item.objectID)} role="button" aria-describedby="hideDesc">[ hide ]</button>
                                            <p id="hideDesc" className="hide">Hide selected rows</p>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <div className="prevNext">
                            <button onClick={this.handlePrevious} role="button" aria-describedby="prevDesc" disabled={this.state.disabled}>Previous</button> |
                            <button onClick={this.handleNext} role="button" aria-describedby="nextDesc">Next</button>
                            <p id="prevDesc" className="hide">shows previous 20 grid results</p>
                            <p id="nextDesc" className="hide">shows next 20 grid results</p>
                        </div>
                        <button onClick={this.handleClearStorage} role="button" className="storage" aria-describedby="storageDesc">Remove storage values</button>
                        <p id="storageDesc" className="hide">Remove local storage values from browser</p>
                    </div>
                    <Chart getStateValue={this.state} aria-describedby="chartDesc" />
                    <p id="chartDesc" className="hide">Displaying line chart</p>
                </>
            );
        } else {
            return (
                <div className="spinner">
                    <Spinner style={{ width: '3rem', height: '3rem' }} aria-describedby="spinnerDesc" />
                    <p id="spinnerDesc" className="hide">Loading...</p>
                </div>
            );
        }
    }
}

export default HackerTable;