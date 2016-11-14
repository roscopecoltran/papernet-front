import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import history from 'routing';

import { paperPropType } from 'utils/constants';

import { deletePaper, getPaper, savePaper, updatePaper } from '../actions';
import { RECEIVE_PAPER } from '../constants';

import PaperEditView from './view';

const mapStateToProps = state => ({
  paper: state.paper,
});

class PaperEditContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    paper: paperPropType.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onDelete = ::this.onDelete;
    this.onSave = ::this.onSave;
  }

  componentWillMount() {
    const { dispatch, params } = this.props;

    if (params.id) {
      dispatch(getPaper(params.id));
    } else {
      dispatch({ type: RECEIVE_PAPER, paper: {} });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.id !== this.props.params.id) {
      if (nextProps.params.id) {
        dispatch(getPaper(nextProps.params.id));
      } else {
        dispatch({ type: RECEIVE_PAPER, paper: {} });
      }
    }
  }

  onChange(key, value) {
    this.props.dispatch(updatePaper(key, value));
  }

  onDelete() {
    this.props.dispatch(deletePaper()).then(
      () => { history.push('/papers'); }
    );
  }

  onSave() {
    this.props.dispatch(savePaper()).then(
      (paperId) => { history.push(`/papers/${paperId}`); }
    );
  }

  render() {
    const { paper } = this.props;

    return (
      <div className="PaperEditContainer">
        <PaperEditView
          onChange={this.onChange}
          onDelete={this.onDelete}
          onSave={this.onSave}
          paper={paper}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperEditContainer);