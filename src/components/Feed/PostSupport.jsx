import React from 'react';
import { Icon, Item, Label, Statistic } from 'semantic-ui-react';

/* helper methods */
const linkToSubreddit = subreddit => `https://www.reddit.com/r/${subreddit}`;
const fullPermalink = permalink => `https://www.reddit.com/${permalink}`;

/* components to support the Post component */

export const Thumbnail = ({ thumbnail, url }) => (
  <a href={url} target="_blank">
    <Item.Image src={thumbnail} size="tiny" />
  </a>
);

export const ThumbnailFallback = ({ name, url }) => (
  <a href={url} target="_blank">
    <Icon
      name={name}
      link
      color="black"
      size="huge"
    />
  </a>
);

export const HeaderAsLink = ({ title, url }) => (
  <a href={url} target="_blank">
    <Item.Header content={title} as="h3" />
  </a>
);

export const LinkToSubreddit = ({ subreddit }) => (
  <a href={linkToSubreddit(subreddit)} target="_blank">
    <Label icon="angle double right" detail={`/r/${subreddit}`} />
  </a>
);

export const Permalink = ({ permalink }) => (
  <a href={fullPermalink(permalink)} target="_blank">
    <Label icon="linkify" detail="permalink" />
  </a>
);

export const CommentCount = ({ num_comments, permalink }) => (
  <a href={fullPermalink(permalink)} target="_blank">
    <Statistic floated="right" size="mini" label="comments" value={num_comments} />
  </a>
);
