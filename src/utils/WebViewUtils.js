import { SIZES, PADDING_BW_ITEMS } from '@styles/sizes';
import { customFonts } from '@styles/customFonts';
/**
 *
 * Overall Html body wrapper
 */
export function getHtmlWrapper(snippet) {
  return (
    `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1">
      <style>
        html{-webkit-text-size-adjust: none;}
        a {color: ` +
    '#0072BC' +
    `; text-decoration: none;}
      </style>
      <script>
        /* Watch content height changes for 10 seconds to adjust the WebView's height appropriately */
        var i = 0;
        var contentHeight = 0;
        var intervalDelay = 500;
        var checkContentHeightChange = setInterval(function() {
          resizeWebView();
        }, intervalDelay);
  
        function resizeWebView() {
          var currentContentHeight = document.body.clientHeight;
          /* If the content height has been changed */
          if (currentContentHeight !== contentHeight) {
            contentHeight = currentContentHeight;
            /* Pass the actual height of the content through document.title */
            document.title = contentHeight;
            /* Change window.location.hash to trigger the onNavigationStateChange event of the WebView */
            window.location.hash = ++i;
          }
        }
  
        /* Listen to post messages sent from misc.thestar.com */
        window.addEventListener('message', receiveMessage, false);
        function receiveMessage(event) {
          var origin = event.origin || event.originalEvent.origin;
          if (origin !== 'https://misc.thestar.com') return;
          if (event && event.data && event.data.resize) {
            var data = event.data.resize;
            if (data.height && data.iframe) {
              document.getElementById(data.iframe).height = data.height;
            }
          }
        }
      </script>
    </head>
    <body style="margin: 0; padding: 0;">
      <div style="overflow: hidden">
        ` +
    snippet +
    `
      </div>
    </body>
  </html>`
  );
}

/**
 *
 * Overall Html body styling
 */
export function getJsInjectionStyle(theme) {
  return (
    `
    /* Apply custom styles to make the component look as designed */
    document.documentElement.style.backgroundColor = '` +
    theme.colors.background +
    `';
    document.documentElement.style.color = '` +
    theme.colors.text +
    `';
    document.documentElement.style.fontFamily = '` +
    customFonts.torstarTextRoman +
    `';
    document.documentElement.style.fontSize = '` +
    SIZES.PARA_FONTSIZE +
    `px';
  `
  );
}
