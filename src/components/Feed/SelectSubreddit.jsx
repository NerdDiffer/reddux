import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

class SelectSubreddit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(_ev, { name, value }) {
    const sr_display_name = value;
    return this.props.selectSubreddit(sr_display_name);
  }

  buildDropdownOptions() {
    const { mySubs } = this.props;

    const options = [];

    for (const url in mySubs) {
      const sr_display_name = mySubs[url].display_name;
      options.push({ value: sr_display_name, text: sr_display_name });
    }

    return options;
  }

  renderDropdown() {
    const { mySubs, selectedSub } = this.props;

    if (!mySubs) {
      return null;
    } else {
      return (
        <Dropdown
          text="Select Subreddit"
          name="selectSubredditDropdown"
          search
          onChange={this.handleChange}
          value={selectedSub}
          options={this.buildDropdownOptions()}
        />
      );
    }
  }

  render() {
    return (
      <span>
        {this.renderDropdown()}
      </span>
    )
  }
}

SelectSubreddit.propTypes = {
  selectedSub: PropTypes.string,
  mySubs: PropTypes.object,
  selectSubreddit: PropTypes.func
};

export default SelectSubreddit;
