import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectSource, updateFeedQueue, toggleMultipleMode } from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';

const buildDropdownOptions = subscriptions => {
  const options = [];

  for (const key in subscriptions) {
    options.push({ value: key, text: key });
  }

  return options;
}

class SelectSource extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggleMultiple = this.toggleMultiple.bind(this);
  }

  componentDidMount() {
    const { subscriptions } = this.props;

    if (!subscriptions) {
      this.props.handleGetMySubreddits();
    }
  }

  toggleMultiple () {
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
    const { subscriptions, source, feedQueue, isMultipleMode } = this.props;

    if (!subscriptions) {
      return null;
    } else {
      const options = buildDropdownOptions(subscriptions);

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

SelectSource.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  subscriptions: PropTypes.object,
  handleGetMySubreddits: PropTypes.func,
  selectSource: PropTypes.func
};

const mapStateToProps = ({ lists, feed }) => {
  const { subscriptions, feedQueue } = lists;
  const { isMultipleMode, source } = feed;

  return { subscriptions, feedQueue, isMultipleMode, source };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleGetMySubreddits,
  selectSource,
  updateFeedQueue,
  toggleMultipleMode
}, dispatch);

const ConnectedSelectSource = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSource);

export default ConnectedSelectSource;
