const fetch = require('node-fetch');

class Meetup {
  constructor(API_KEY){
    this.API_KEY = API_KEY;
    
    //  Group request caching
    this.lastGroupResponse = undefined;
  }

  _fetchGroup(groupName) {
    if(this.lastGroupResponse) {
      return new Promise((resolve, reject) => resolve(this.lastGroupResponse));
    }
    return fetch(`https://api.meetup.com/${groupName}?&sign=true&photo-host=public?key=${this.API_KEY}`).then(r => r.json())
    .then(response => {
      this.lastGroupResponse = response;
      return new Promise((resolve, reject) => resolve(response));
    })
  }

  _fetchNextEvent(groupName) {
    return fetch(`https://api.meetup.com/${groupName}/events?&sign=true&photo-host=public?key=${this.API_KEY}`).then(r => r.json())
    .then(response => {
      this.lastEventResponse = response;
      return new Promise((resolve, reject) => resolve(response));
    })
  }

  getGroup(groupName) {
    return this._fetchGroup(groupName).then(group => {
      return new Promise((resolve, reject) => {
        resolve(group);
      })
    });
  }

  getNextEvent(groupName) {
    return this._fetchNextEvent(groupName);
  }

}

module.exports = Meetup;
module.exports.default = module.exports;