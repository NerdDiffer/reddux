import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Dropdown, Checkbox } from 'semantic-ui-react';
import { FRONT_PAGE } from '../../state/constants';
import * as feedActions from '../../state/actions/feed';
import { handleGetMySubreddits } from '../../state/actions/subreddits';

const buildDropdownOptions = subscriptions => {
  const options = [{ value: FRONT_PAGE, text: FRONT_PAGE }];

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

    // TODO: use a "lastUpdated" timestamp or boolean flag in state, so you
    // don't have to run this code every time.
    if (Object.keys(subscriptions).length < 1) {
      this.props.handleGetMySubreddits();
    }
  }

  toggleMultiple () {
    const { toggleMultipleMode, convertSource, replaceFeedItems } = this.props;
    toggleMultipleMode();
    convertSource();
    replaceFeedItems();
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

      let checkboxLabel;
      let text;
      let value;

      if (isMultipleMode) {
        checkboxLabel = 'Multiple Mode: On';
        text = 'Subs';
        value = feedQueue;
      } else {
        checkboxLabel = 'Multiple Mode: Off';
        text = 'Sub';
        value = source;
      }

      return (
        <div className="dropdown">
          <Form.Group grouped>
            <Checkbox
              checked={isMultipleMode}
              onChange={this.toggleMultiple}
              label={checkboxLabel}
            />
          </Form.Group>
          <Form.Group grouped>
            <Dropdown
              text={text}
              name="selectSourceDropdown"
              search
              multiple={isMultipleMode}
              labeled
              button
              className="icon"
              value={value}
              options={options}
              onChange={this.handleChange}
            />
          </Form.Group>
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
  ...feedActions
}, dispatch);

const ConnectedSelectSource = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSource);

export default ConnectedSelectSource;
