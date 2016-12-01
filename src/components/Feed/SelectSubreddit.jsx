import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectSource, updateFeedQueue, toggleMultipleMode } from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';

const buildDropdownOptions = mySubs => {
  const options = [];

  for (const key in mySubs) {
    options.push({ value: key, text: key });
  }

  return options;
}

class SelectSubreddit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggleMultiple = this.toggleMultiple.bind(this);
  }

  componentDidMount() {
    const { mySubs } = this.props;

    if (!mySubs) {
      this.props.handleGetMySubreddits();
    }
  }

  toggleMultiple = (e) => {
    const { isMultipleMode, source, feedQueue } = this.props;
    console.log(isMultipleMode, source, feedQueue);
    this.props.toggleMultipleMode();
  }

  handleChange(_ev, { value }) {
    const { isMultipleMode } = this.props;

    if (isMultipleMode) {
      const feedQueue = value;
      return this.props.updateFeedQueue(feedQueue);
    } else {
      const sr_display_name = value;
      return this.props.selectSource(sr_display_name);
    }
  }

  render() {
    const { mySubs, source, feedQueue, isMultipleMode } = this.props;

    if (!mySubs) {
      return null;
    } else {
      const options = buildDropdownOptions(mySubs);

      return (
        <div className="dropdown">
          {' '}
          <label>
            <input
              type='checkbox'
              checked={isMultipleMode}
              onChange={this.toggleMultiple}
              content="Multiple"
            />
          </label>
          <Dropdown
            text="Select Subreddit"
            name="selectSourceDropdown"
            search
            multiple={isMultipleMode}
            labeled
            button
            className="icon"
            value={isMultipleMode ? feedQueue : source}
            options={options}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  }
}

SelectSubreddit.propTypes = {
  source: PropTypes.string,
  mySubs: PropTypes.object,
  handleGetMySubreddits: PropTypes.func,
  selectSource: PropTypes.func
};

const mapStateToProps = ({ lists, feed }) => {
  const { subscriptions: mySubs, feedQueue } = lists;
  const { isMultipleMode, source } = feed;

  return { mySubs, feedQueue, isMultipleMode, source };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleGetMySubreddits,
  selectSource,
  updateFeedQueue,
  toggleMultipleMode
}, dispatch);

const ConnectedSelectSubreddit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSubreddit);

export default ConnectedSelectSubreddit;
