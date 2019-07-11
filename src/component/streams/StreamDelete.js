import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id)
	}

	renderActions() {
		const { id } = this.props.match.params;
		const disabled = this.props.stream && this.props.currentUserId === this.props.stream.userId ? '' : 'disabled'
		return(
			<React.Fragment>
				<button
					onClick={() => this.props.deleteStream(id) }
					className={`ui button negative ${disabled}`}
				>
					Delete
				</button>
				<Link to="/" className="ui button">Cancel</Link>
			</React.Fragment>
		);
	}

	renderContent() {
		if (!this.props.stream || ! this.props.currentUserId) {
			return 'Loading Stream Detail...';
		} else if (this.props.stream.userId !== this.props.currentUserId) {
			return 'You do NOT have right to delete this stream!'
		} else {
			return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;	
		}
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}	
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		currentUserId: state.auth.userId
	};
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
