// Generated by CoffeeScript 2.4.1
/*
WebRTC shims for multiple browsers.
*/
var IceCandidate, PeerConnection, SessionDescription, WebSocket, XMLHttpRequest, chrome, document, location, webrtc, window;

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  window = {};
  document = {
    getElementById: function() {
      return null;
    }
  };
  chrome = {};
  location = '';
  if ((typeof TESTING === "undefined" || TESTING === null) || !TESTING) {
    webrtc = require('wrtc');
    PeerConnection = webrtc.RTCPeerConnection;
    IceCandidate = webrtc.RTCIceCandidate;
    SessionDescription = webrtc.RTCSessionDescription;
    WebSocket = require('ws');
    ({XMLHttpRequest} = require('xmlhttprequest'));
  }
} else {
  window = this;
  document = window.document;
  chrome = window.chrome;
  location = window.location.search.substr(1);
  PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  IceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
  SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
  WebSocket = window.WebSocket;
  XMLHttpRequest = window.XMLHttpRequest;
}
