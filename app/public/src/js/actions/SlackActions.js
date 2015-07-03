import $ from 'jquery';
import SlackDispatcher from '../dispatcher/SlackDispatcher';
import SlackConstants from '../constants/SlackConstants';

let generateApiUrl = (url) => url + '?t=' + (new Date()).getTime();

export default {
  getChannels() {
    $.get(generateApiUrl('./channels.json')).then((channels) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_CHANNELS,
        channels
      });
    });
  },
  getUsers() {
    $.get(generateApiUrl('./users.json')).then((users) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_USERS,
        users
      });
    });
  },
  getMessages(channel) {
    let url = generateApiUrl('./messages/' + channel + '.json');
    $.post(url).then((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MESSAGES,
        messages
      });
    });
  },
  getMoreMessages(channel, minTs) {
    let url = generateApiUrl('./messages/' + channel + '.json');
    $.post(url, { min_ts: minTs }).then((messages) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_MORE_MESSAGES,
        messages
      });
    });
  },
  updateCurrentChannel({ channel, pushState = true, replaceState = false }) {
    SlackDispatcher.dispatch({
      actionType: SlackConstants.UPDATE_CURRENT_CHANNEL,
      currentChannel: channel,
      option: { pushState, replaceState }
    });
  },
  getTeamInfo() {
    let url = generateApiUrl('./team.json');
    $.get(url).then((teamInfo) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_TEAM_INFO,
        teamInfo
      });
    });
  },
  getLoggerStatus() {
    let url = generateApiUrl('./logger_status.json');
    $.get(url).then((status) => {
      SlackDispatcher.dispatch({
        actionType: SlackConstants.UPDATE_LOGGER_STATUS,
        status
      });
    });
  },
  startLogger() {
    let url = generateApiUrl('./start_logger');
    $.post(url).then(() => {
      this.getLoggerStatus();
    });
  },
  stopLogger() {
    let url = generateApiUrl('./stop_logger');
    $.post(url).then(() => {
      this.getLoggerStatus();
    });
  },
  importData(formData) {
    let url = generateApiUrl('./import_data');
    $.ajax({
      url,
      method: 'post',
      data: formData,
      processData: false,
      contentType: false
    });
  }
};
