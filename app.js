(function (window) {
  const BinFetcher = () => {
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

      fetch(href).then(resp => resp.text()).then(resp =>{
        
          _fetcher.root.innerHTML = resp;
           window.history.pushState({ path: href }, "", href);
           _fetcher.init();
      }).catch(e => e);


    };

    return _fetcher;
  };

  if (typeof window.BinFetcher === "undefined") {
    window.BinFetcher = BinFetcher;
    
  }
})(window);
