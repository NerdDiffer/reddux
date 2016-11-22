import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectSubreddit } from '../../state/actions/posts';
import { handleGetMySubreddits } from '../../state/actions/subreddits';

const buildDropdownOptions = mySubs => {
  const options = [];

  for (const url in mySubs) {
    const sr_display_name = mySubs[url].display_name;
    options.push({ value: sr_display_name, text: sr_display_name });
  }

  return options;
}

class SelectSubreddit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { mySubs } = this.props;

    if (!mySubs) {
      this.props.handleGetMySubreddits();
    }
  }

  handleChange(_ev, { name, value }) {
    const sr_display_name = value;
    return this.props.selectSubreddit(sr_display_name);
  }

  render() {
    const { mySubs, selectedSub } = this.props;

    if (!mySubs) {
      return null;
    } else {
      const options = buildDropdownOptions(mySubs);

      return (
        <Dropdown
          text="Select Subreddit"
          name="selectSubredditDropdown"
          search
          labeled
          button
          className="icon"
          value={selectedSub}
          options={options}
          onChange={this.handleChange}
        />
      );
    }
  }
}

SelectSubreddit.propTypes = {
  selectedSub: PropTypes.string,
  mySubs: PropTypes.object,
  handleGetMySubreddits: PropTypes.func,
  selectSubreddit: PropTypes.func
};

const mapStateToProps = ({ subreddits }) => {
  const { subscribedTo: mySubs } = subreddits;

  return { mySubs };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleGetMySubreddits,
  selectSubreddit
}, dispatch);

const ConnectedSelectSubreddit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSubreddit);

export default ConnectedSelectSubreddit;
