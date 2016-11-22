import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

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
  selectSubreddit: PropTypes.func
};

export default SelectSubreddit;
