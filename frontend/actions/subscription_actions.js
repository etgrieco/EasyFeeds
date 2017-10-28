import * as SubscriptionApiUtil from '../util/subscription_api_util';

// export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';
export const REMOVE_FEED = 'REMOVE_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const RECEIVE_SUBSCRIPTION_ERRORS = 'RECEIVE_SUBSCRIPTION_ERRORS';
export const START_FEED_ACTION = 'START_FEED_ACTION';

export const receiveAllSubscriptions = feedsPayload => ({
  type: RECEIVE_ALL_SUBSCRIPTIONS,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions
});

export const removeFeed = feedId => ({
  type: REMOVE_FEED,
  feedId
});

export const receiveFeed = feedPayload => ({
  type: RECEIVE_FEED,
  feed: feedPayload.feed,
  subscription: feedPayload.subscription
});

export const startFeedAction = messages => ({
  type: START_FEED_ACTION,
  messages
});

export const receiveSubscriptionErrors = errors => ({
  type: RECEIVE_SUBSCRIPTION_ERRORS,
  errors
});

export const fetchAllSubscriptions = () => dispatch => {
  dispatch(startFeedAction(["Loading Feeds..."]));
  return (
    SubscriptionApiUtil.fetchSubscriptions()
      .then(
      subscriptionsPayload =>
        dispatch(receiveAllSubscriptions(subscriptionsPayload)),
      errors =>
        dispatch(receiveSubscriptionErrors(["Error loading subscriptions"]))
      )
  );
};

export const deleteFeed = feed => dispatch => (
  SubscriptionApiUtil.deleteSubscription(feed.subscription_id)
    .then(() => dispatch(removeFeed(feed.id)))
);

export const updateFeed = feed => dispatch => {
  const subscription = {
    title: feed.subscription_title,
    id: feed.subscription_id
  };
  dispatch(startFeedAction(["Updating Feed..."]));
  return SubscriptionApiUtil.updateSubscription(subscription)
    .then(
      updatedFeed => {
        return dispatch(receiveFeed(updatedFeed));
      },
      errors => {
        return dispatch(receiveSubscriptionErrors(errors.responseJSON));
    });
};

export const createFeed = feed => dispatch => {
  dispatch(startFeedAction(["Creating Feed..."]));
  return (
    SubscriptionApiUtil.createFeed(feed)
    .then(
      newFeed => dispatch(receiveFeed(newFeed)),
      errors => dispatch(receiveSubscriptionErrors(errors.responseJSON)))
  );
};