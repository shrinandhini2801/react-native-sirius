import { DeviceWidth, SIZES } from '@styles/sizes';
import { getHtmlWrapper } from '@utils/WebViewUtils';
import { layout } from '@utils/Layout';

export function getSnippet(item, wrapWithHtml) {
  /**
   * --DEV NOTES--
   * Exception : if item type is youtube , it renders just the snippet instead of source obj ,
   * because the youtube has to be rendered in article page instead of In app browser
   */
  if (item.type === 'youtube' && item.id) {
    let plainSnippet =
      `
    <style>
      .videoWrapper {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        padding-top: 25px;
        height: 0;
    
      }
      .videoWrapper iframe {
        position: absolute;
        top: -2px;
        width: 100% !important;
        height: 100% !important;
      }
    </style>
    <div class="videoWrapper">
      <iframe src="https://www.youtube.com/embed/` +
      item.id +
      `?autoplay=0&wmode=transparent" frameborder="0" allowfullscreen="allowfullscreen" webkitallowfullscreen mozallowfullscreen />
    </div>
    `;
    return wrapWithHtml ? getHtmlWrapper(plainSnippet) : plainSnippet;
  } else if (item.type === 'poll' && item.pollid) {
    //TODO: inject custom css if needed
    const WRAPPER_PREFIX_POLLDADDY =
      `<link rel="stylesheet" href="http://www.metronews.ca/etc/designs/thestar/mainlib.min.css?v=29" type="text/css" />
<style>
  .thestar-poll {
  width: ` +
      DeviceWidth * 0.96 +
      `px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  },
</style>
<div class="thestar-poll star-box float-clear wide">
<div class="container">
`;

    const WRAPPER_SUFFIX_POLLDADDY = '</div></div>';
    const url =
      'https://static.polldaddy.com/p/' +
      encodeURIComponent(item.pollid) +
      '.js';
    let html = WRAPPER_PREFIX_POLLDADDY;
    html +=
      '<script type="text/javascript" src="' +
      url +
      '" charset="UTF-8"></script>';
    html += WRAPPER_SUFFIX_POLLDADDY;
    return {
      source: {
        html: wrapWithHtml ? getHtmlWrapper(html) : html,
        baseUrl: 'http://static.polldaddy.com'
      }
    };
  } else if (item.type === 'scribd' && item.id) {
    const url =
      'http://www.scribd.com/embeds/' +
      encodeURIComponent(item.id) +
      '/content?start_page=1&view_mode=scroll&' +
      'access_key=key-14x2zy69z8ecwa0wzhbu&show_recommendations=true';
    return { source: { uri: url } };
  } else if (item.type === 'ustream' && item.ustreamid) {
    const url =
      'https://www.ustream.tv/embed/' + encodeURIComponent(item.ustreamid);
    return { source: { uri: url } };
  } else if (item.type === 'sam' && item.id) {
    let plainSnippet =
      `
    <div id="sam-embed-` +
      item.id +
      `"></div>
    <script>var samOptions = {"embedId":"` +
      item.id +
      `","domain":"//embed.samdesk.io"};</script>
    <script src="https://embed.samdesk.io/js/embed.js"></script>`;
    return wrapWithHtml ? getHtmlWrapper(plainSnippet) : plainSnippet;
  } else if (item.type === 'fbpost' && item.postUrl) {
    let fbWidth = layout.isMobile ? DeviceWidth * 0.85 : DeviceWidth * 0.92;
    let fbHeight = layout.isMobile ? 480 : 530;
    let plainSnippet =
      `<style>
      .videoContainer {
        width: 100% !important;
      }
    </style>
    <div class="videoContainer"><iframe src="https://www.facebook.com/plugins/post.php?href=${item.postUrl}&show_text=true&appId=1557805337644448" width="${fbWidth} !important" height="${fbHeight}" style="border:none;overflow:hidden;" allowfullscreen="" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe></div>`;
    return wrapWithHtml ? getHtmlWrapper(plainSnippet) : plainSnippet;
  } else if (item.type === 'twitter_tweet' && item.id) {
    let plainSnippet = `<script>
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));

    twttr.ready(function(e) {
      if (twttr.widgets) {
        twttr.widgets.createTweet(
          '` + item.id + `',
          document.getElementById('twitterTweet'),{
            align: 'center',
          }
        )
      }
    });
  </script>
  <div id="twitterTweet"></div>`;
    return wrapWithHtml ? getHtmlWrapper(plainSnippet) : plainSnippet;
  } else if (item.type === 'twitter' && item.id && item.height) {
    const TWITTER_MAINWRAP = `
    <script>window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
      return t;
    }(document, "script", "twitter-wjs"));</script>
    `;

    let plainSnippet = TWITTER_MAINWRAP;
    const id = encodeURIComponent(item.id);
    const height = encodeURIComponent(item.height);
    plainSnippet += `<div class="twitter-timeline-container">
<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/TwitterDev/timelines/${id}"
  data-widget-id="${id}" data-height="${layout.height * 0.6}" data-width="${layout.width}"
  data-chrome="nofooter" data-border-color="#cccccc"></a>
</div>`;
    return wrapWithHtml ? getHtmlWrapper(plainSnippet) : plainSnippet;
  }
}
