import Comment from './Comment.jsx';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import React from 'react';
import {List} from 'material-ui/List';
import CommentForm from './CommentForm.jsx'


class CommentList extends React.Component {

	constructor() {
		super();
		this.state = {
			showComments: false,
			comments: []
		};
	}


	/**This function runs before render method,
	 * Fetching data from source for the first time*/
	componentWillMount() {
		var commentList = 
		{
			comments : 
			[]
		}

		if(!localStorage.getItem('comments')){
			localStorage.setItem('comments',JSON.stringify(commentList));
		}
	}

	/**This function runs after render method
	 * Polling data from server every 60 seconds */

	componentDidMount() {
		this._fetchComments();

		this._timer = setInterval(() => this._fetchComments(), 60000);
	}

	componentWillUnmount() {
		/**Clearing closed intervals(_timer here) in Single Page Apps will prevent memory leaks */
		clearInterval(this._timer);

	}

	_getCommentList() {
		return JSON.parse(localStorage.getItem('comments')).comments.map((comment) => {
			return (<Comment key={comment.id}
											 author={comment.author}
											 body={comment.body}
											 onDelete={this._deleteComment.bind(this)}
				/>
			)
		});
	}

	_getCommentTitle(comments) {
		if (comments.length === 0) {
			return (<span>No comments yet</span>);
		}
		else if (comments.length === 1) {
			return (<span> 1 comment</span>);
		}
		else {
			return (<span>{comments.length} comments</span>);
		}
	}

	_handleClick() {
		this.setState({
			showComments: !this.state.showComments,
			// comments: localStorage.getItem('comments')

		});
	}



	render() {

		const comments = this._getCommentList();
		let commentHtml, buttonText = 'Show Comments';

		if (this.state.showComments) {
			commentHtml = comments;
			buttonText = 'Hide Comments'
		}

		return (
			<div style={{margin:'0 auto', width:'600px'}}>
				<List>
					<CommentForm addComment={this._addComment.bind(this)}/>
					<br />
					<br />
					<br />
						<div style={{padding:'15px', backgroundColor:'#696969'}}>
							<RaisedButton onClick={this._handleClick.bind(this)} label={buttonText}/>
						</div>
					<Paper>
						<h2 style={{padding:'15px'}}>{this._getCommentTitle(comments)}</h2>
					{
						commentHtml
					}
						</Paper>
				</List>
			</div>
		)
	}


	/**-----------------
	 * AJAX CALLS
	 * ----------------*/

	_fetchComments() {
		// $.ajax({
		// 	//	url: './api/comments'
		// 	url: './Data/comments.json',
		// 	type: 'GET',
		// 	dataType: 'json',
		// 	cache: false,
		// 	success: (comments)=> {
		// 		this.setState({comments})
		// 	},
		// });

		// let value = localStorage.getItem('author')
		// value = JSON.parse(value)
		// this.setState({[author})
		// console.log(value)
		// this.setState({comments})
		// console.log(localStorage.getItem('comment'))
		console.log('fetched data!');
	}
	_deleteComment(comment) {
		/**
		$.ajax({
			method: 'DELETE',
			url: `./api/comments/${comment.id}`

		}) */
		console.log('deleted!');
		/** ... using spread operator to clone existing array */
		const comments = [...this.state.comments];
		const commentIndex = comments.indexOf(comment);
		comments.splice(commentIndex, 1);
		this.setState({comments});
	}
	_addComment(author, body) {

		/**
		 const comment = { author, body}
		 $.post('api/comments', {comment})
		  .success(newComment => {
				this.setState({comments: this.state.comments.concat([comment]});
		  });
		 */
		const comment = {
			id: this.state.comments.length + 1,
			author,
			body
		};

		this.setState({comments: this.state.comments.concat([comment])});
		// localStorage.setItem('comment',JSON.stringify(this.state.comments));
		console.log('added!')
	}


}
// module.exports = CommentList;

export default CommentList;