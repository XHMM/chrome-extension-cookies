const $container = document.getElementById('container')
const $tip = document.getElementById('tip')

document.addEventListener('DOMContentLoaded', ()=> {
  $container.onclick = function (ev) {
    const content = $container.textContent
    navigator.clipboard.writeText(content)
    $tip.textContent = '(copied)'
  }
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
      const url = new URL(tabs[0].url)
      const host = url.host;

      chrome.cookies.getAll({
        domain: host
      }, (cookies) => {
        const cookiesStr = cookies.map(c => c.name+"="+c.value).join(';')

        $container.textContent = cookiesStr;
      })
    }
  );
})

