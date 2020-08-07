(function (window) {
  const Fetcher = () => {
    let _fetcher = {};

    _fetcher.init = () => {
      _fetcher.root = document.querySelector("html");
      _fetcher.origin = new RegExp(location.host);
      let links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          if (!_fetcher.origin.test(link.href)) {
            return;
          }
          e.preventDefault();
          // console.log("Link Clicked");
          let href = link.href;
          // console.log(href);
          _fetcher.load(href);
        });
      });
      window.addEventListener("popstate", _fetcher.popstate);
    };

    _fetcher.popstate = () => {
      let href = location.href;
      _fetcher.load(href);
    };

    _fetcher.load = (href) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          response = this.responseText;
           window.history.pushState({ path: href }, "", href);
          _fetcher.root.innerHTML = response;
          _fetcher.init();
        }
      };
      xhttp.open("GET", href, true);
      xhttp.send();
    };

    return _fetcher;
  };

  if (typeof window.BinFetcher === "undefined") {
    window.BinFetcher = Fetcher;
  }
})(window);
