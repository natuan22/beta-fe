(function (loadJQuery, loadSignalR, FiinTrade) {
  FiinConfig = {
    ENDPOINT_OPTIONS: {
      APP_ENDPOINT: "https://beta-charting.fiintrade.vn",
      CORE_ENDPOINT: "https://staging-wl-core.fiintrade.vn",
      FUNDAMENTAL_ENDPOINT: "https://staging-wl-fundamental.fiintrade.vn",
      MARKET_ENDPOINT: "https://staging-wl-market.fiintrade.vn",
      NEWS_ENDPOINT: "https://staging-wl-news.fiintrade.vn",
      TECHNICAL_ENDPOINT: "https://staging-wl-technical.fiintrade.vn",
      TOOLS_ENDPOINT: "https://staging-wl-tools.fiintrade.vn",
      STRATEGY_ENDPOINT: "https://staging-wl-strategy.fiintrade.vn",
      REALTIME_ENDPOINT: "https://staging-wl-realtime.fiintrade.vn",
    },
    ComponentUrlMap: {
      Charting: "/charting",
    },
    Hubs: [
      {
        ServerUrl: "/RealtimeHub",
        Prefix: "Realtime",
        RegisteredRemoteChanels: [],
      },
    ],
    ChanelConfig: {
      TickChanel: "Realtime.Tick",
      HeatMapChanelPrefix: "Market.HeatMap",
      IndexChannel: "Realtime.Index",
      WatchListChannel: "Realtime.WatchList",
      PerformanceChannel: "Realtime.Performance",
      BidAskChannel: "Realtime.BidAsk",
      DerivativeChannel: "Realtime.Derivative",
      OtherLoginChannel: "Realtime.UserLogin",
      CoveredWarrantChannel: "Realtime.CoveredWarrant",
    },
    formatUrl: function (url) {
      for (var key in FiinConfig.ENDPOINT_OPTIONS) {
        if (url.startsWith(key)) {
          url = url.replace(key, FiinConfig.ENDPOINT_OPTIONS[key]);
        }
      }

      return url;
    },
  };

  FiinUtils = {
    loadScript: function (src) {
      return new Promise(function (resolve, reject) {
        // set document head to varible
        var head =
          document.getElementsByTagName("head")[0] || document.documentElement;

        var scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = src;

        // Handle Script loading
        // IE9+ supports both script.onload AND script.onreadystatechange (bit.ly/18gsqtw)
        // so both events will be triggered (that's 2 calls), which is why "jqLoadDone" is needed
        var loadDone = false;

        // Attach handlers for all browsers
        scriptTag.onload = scriptTag.onreadystatechange = function () {
          if (
            !loadDone &&
            (!this.readyState ||
              this.readyState === "loaded" ||
              this.readyState === "complete")
          ) {
            loadDone = true;

            // Handle memory leak in IE
            scriptTag.onload = scriptTag.onreadystatechange = null;
            if (head && scriptTag.parentNode) {
              head.removeChild(scriptTag);
            }

            resolve();
          } else {
            reject();
          }
        };

        // add script to page's head tag.
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        head.insertBefore(scriptTag, head.firstChild);
      });
    },
    emptyPromise: function () {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    },
    updateCode: function () {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    },
  };

  class SignalrMessageHub {
    constructor() {
      this.chanels = [];
      this.messageChanelToHubs = []; // map hubs to a label
      this.remoteChanelToHubs = []; // rpc
      this.queuedRemoteCalls = []; // if a rpc posted while connection down, push it to a queue
      this.runQueueThread = null;
      this.init();
    }

    // iterate all signalr config and create connections
    init() {
      FiinConfig.Hubs.forEach((hub, index) => {
        var keypair = FiinTrade.KeyProvider.load();
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(
            FiinConfig.ENDPOINT_OPTIONS.REALTIME_ENDPOINT +
              hub.ServerUrl +
              "?xfiinkey=" +
              keypair.XFiinKey +
              "&xfiinseed=" +
              keypair.XFiinSeed,
            {
              transport: signalR.HttpTransportType.WebSockets, // | signalR.HttpTransportType.LongPolling, // | HttpTransportType.WebSockets // websocket will throw error, can not resolve this yet
              skipNegotiation: true,
            }
          )
          .configureLogging(signalR.LogLevel.Error)
          .build();

        //map hub connection to a label
        this.messageChanelToHubs[hub.Prefix] = connection;

        connection.on("ReceiveMessage", (message) => {
          FiinTrade.broadcast({
            chanel: message.chanel,
            data: this.preprocessData(message.chanel, message.data),
          });
          console.log(
            new Date().toLocaleTimeString(),
            "signalr receive message"
          );
          //this.publish(
          //    message.chanel,
          //    this.preprocessData(message.chanel, message.data),
          //);
          // }
        });

        //do reconnect
        connection.onclose((e) => {
          setTimeout(() => this.connect(connection), 5000);
          this.publish("socketClosed");
        });

        this.connect(connection);

        //register rpc, map a rpc to a hub
        hub.RegisteredRemoteChanels.forEach((chanel, index) => {
          if (this.remoteChanelToHubs[chanel]) {
            throw new Error("Remote chanel is duplicated: " + chanel);
          }
          this.remoteChanelToHubs[chanel] = connection;
        });
      });
      console.log(new Date().toLocaleTimeString(), "all hub init complete");
    }

    async connect(hub) {
      let self = this;
      await hub
        .start()
        .then(() => self.runQueue())
        .catch((err) => {
          // console.log(err);

          //try re-connecting after 5s
          setTimeout(() => {
            // console.log('reconnect');
            this.connect(hub);
          }, 5000);
        });
    }

    //push an action to the queue
    //it is posible for a race condition
    ensure(f) {
      this.queuedRemoteCalls.push(f);
    }

    runQueue() {
      var fails = [];
      while (this.queuedRemoteCalls && this.queuedRemoteCalls.length > 0) {
        var f = this.queuedRemoteCalls.shift();
        if (!f()) {
          fails.push(f);
        }
      }
      for (var f of fails) {
        this.queuedRemoteCalls.push(f);
      }
      if (this.runQueueThread != null) {
        clearTimeout(this.runQueueThread);
      }
      this.runQueueThread = setTimeout(() => {
        this.runQueue();
      }, 1000);
    }

    invoke(chanel, message, fail) {
      this.remoteChanelToHubs[chanel]
        .invoke(chanel, message)
        .catch((error) => fail(error));
    }

    publish(chanel, data) {
      if (this.chanels[chanel]) {
        this.chanels[chanel].forEach((action) => {
          action(data);
        });
      }
    }

    subscribe(chanel, action) {
      if (!this.chanels[chanel]) {
        if (action) {
          this.chanels[chanel] = [];
        }

        //register group on signalr server
        const hubPrefix = chanel.split(".")[0];
        if (this.messageChanelToHubs[hubPrefix]) {
          if (this.messageChanelToHubs[hubPrefix].connectionState === 1) {
            this.messageChanelToHubs[hubPrefix].invoke("JoinGroup", chanel);
          } else {
            let self = this;
            this.ensure(() => {
              if (
                self.messageChanelToHubs[hubPrefix] &&
                self.messageChanelToHubs[hubPrefix].connectionState === 1
              ) {
                self.messageChanelToHubs[hubPrefix].invoke("JoinGroup", chanel);
                return true;
              }
              return false;
            });
          }
        }
      }

      if (action) {
        this.chanels[chanel].push(action);
      }
    }

    unsubscribe(chanel, action) {
      if (this.chanels[chanel]) {
        this.chanels[chanel] = this.chanels[chanel].filter((a) => a !== action);

        if (this.chanels[chanel].length === 0) {
          delete this.chanels[chanel];
        }

        //unregister group on signalr server
        const hubPrefix = chanel.split(".")[0];
        if (!this.chanels[chanel] && this.messageChanelToHubs[hubPrefix]) {
          if (this.messageChanelToHubs[hubPrefix].connectionState === 1) {
            this.messageChanelToHubs[hubPrefix].invoke("LeaveGroup", chanel);
          } else {
            let self = this;
            this.ensure(() => {
              if (
                this.messageChanelToHubs[hubPrefix] &&
                this.messageChanelToHubs[hubPrefix].connectionState === 1
              ) {
                self.messageChanelToHubs[hubPrefix].invoke(
                  "LeaveGroup",
                  chanel
                );
                return true;
              }
              return false;
            });
          }
        }
      }
    }

    formatTickers(tickers) {
      var res = [];
      for (var str of tickers) {
        var data = str.split("|");
        res.push({
          totalMatchVolume: Number(data[0]),
          marketStatus: data[1],
          tradingDate: new Date(data[2]),
          matchType: Number(data[3]),
          comGroupCode: data[4],
          organCode: data[5],
          ticker: data[6],
          referencePrice: Number(data[7]),
          openPrice: Number(data[8]),
          closePrice: Number(data[9]),
          ceilingPrice: Number(data[10]),
          floorPrice: Number(data[11]),
          highestPrice: Number(data[12]),
          lowestPrice: Number(data[13]),
          matchPrice: Number(data[14]),
          priceChange: Number(data[15]),
          percentPriceChange: Number(data[16]),
          matchVolume: Number(data[17]),
          matchValue: Number(data[18]),
          totalMatchValue: Number(data[19]),
          totalBuyTradeVolume: Number(data[20]),
          totalSellTradeVolume: Number(data[21]),
          dealPrice: Number(data[22]),
          totalDealVolume: Number(data[23]),
          totalDealValue: Number(data[24]),
          foreignBuyVolumeTotal: Number(data[25]),
          foreignBuyValueTotal: Number(data[26]),
          foreignSellVolumeTotal: Number(data[27]),
          foreignSellValueTotal: Number(data[28]),
          foreignTotalRoom: Number(data[29]),
          foreignCurrentRoom: Number(data[30]),
        });
      }

      return res;
    }

    formatCW(cws) {
      var res = [];
      for (var str of cws) {
        var data = str.split("|");
        res.push({
          totalMatchVolume: Number(data[0]),
          marketStatus: data[1],
          tradingDate: new Date(data[2]),
          matchType: Number(data[3]),
          comGroupCode: data[4],
          organCode: data[5],
          ticker: data[6],
          referencePrice: Number(data[7]),
          openPrice: Number(data[8]),
          closePrice: Number(data[9]),
          ceilingPrice: Number(data[10]),
          floorPrice: Number(data[11]),
          highestPrice: Number(data[12]),
          lowestPrice: Number(data[13]),
          matchPrice: Number(data[14]),
          priceChange: Number(data[15]),
          percentPriceChange: Number(data[16]),
          matchVolume: Number(data[17]),
          matchValue: Number(data[18]),
          totalMatchValue: Number(data[19]),
          totalBuyTradeVolume: Number(data[20]),
          totalSellTradeVolume: Number(data[21]),
          dealPrice: Number(data[22]),
          totalDealVolume: Number(data[23]),
          totalDealValue: Number(data[24]),
          foreignBuyVolumeTotal: Number(data[25]),
          foreignBuyValueTotal: Number(data[26]),
          foreignSellVolumeTotal: Number(data[27]),
          foreignSellValueTotal: Number(data[28]),
          foreignTotalRoom: Number(data[29]),
          foreignCurrentRoom: Number(data[30]),
        });
      }

      return res;
    }

    formatIndexs(indexs) {
      var res = [];
      for (var str of indexs) {
        var data = str.split("|");
        res.push({
          totalMatchVolume: Number(data[0]),
          marketStatus: data[1],
          tradingDate: new Date(data[2]),
          comGroupCode: data[3],
          referenceIndex: Number(data[4]),
          openIndex: Number(data[5]),
          closeIndex: Number(data[6]),
          highestIndex: Number(data[7]),
          lowestIndex: Number(data[8]),
          indexValue: Number(data[9]),
          indexChange: Number(data[10]),
          percentIndexChange: Number(data[11]),
          matchVolume: Number(data[12]),
          matchValue: Number(data[13]),
          totalMatchValue: Number(data[14]),
          totalDealVolume: Number(data[15]),
          totalDealValue: Number(data[16]),
          totalStockUpPrice: Number(data[17]),
          totalStockDownPrice: Number(data[18]),
          totalStockNoChangePrice: Number(data[19]),
          totalStockOverCeiling: Number(data[20]),
          totalStockUnderFloor: Number(data[21]),
          foreignBuyVolumeTotal: Number(data[22]),
          foreignBuyValueTotal: Number(data[23]),
          foreignSellVolumeTotal: Number(data[24]),
          foreignSellValueTotal: Number(data[25]),
          volumeBu: Number(data[26]),
          VolumeSd: Number(data[27]),
        });
      }

      return res;
    }

    formatDerivatives(derivatives) {
      var res = [];

      for (var str of derivatives) {
        var data = str.split("|");
        res.push({
          totalMatchVolume: Number(data[0]),
          marketStatus: data[1],
          tradingDate: new Date(data[2]),
          matchType: Number(data[3]),
          comGroupCode: data[4],
          derivativeCode: data[5],
          referencePrice: Number(data[6]),
          openPrice: Number(data[7]),
          closePrice: Number(data[8]),
          ceilingPrice: Number(data[9]),
          floorPrice: Number(data[10]),
          highestPrice: Number(data[11]),
          lowestPrice: Number(data[12]),
          matchPrice: Number(data[13]),
          priceChange: Number(data[14]),
          percentPriceChange: Number(data[15]),
          matchVolume: Number(data[16]),
          matchValue: Number(data[17]),
          totalMatchValue: Number(data[18]),
          totalBuyTradeVolume: Number(data[19]),
          totalSellTradeVolume: Number(data[20]),
          dealPrice: Number(data[21]),
          totalDealVolume: Number(data[22]),
          totalDealValue: Number(data[23]),
          foreignBuyVolumeTotal: Number(data[24]),
          foreignBuyValueTotal: Number(data[25]),
          foreignSellVolumeTotal: Number(data[26]),
          foreignSellValueTotal: Number(data[27]),
          foreignTotalRoom: Number(data[28]),
          foreignCurrentRoom: Number(data[29]),
          openInterest: Number(data[30]),
        });
      }

      return res;
    }

    formatBidAsk(bidAsks) {
      var res = [];

      for (var str of bidAsks) {
        var data = str.split("|");
        res.push({
          comGroupCode: data[0],
          organCode: data[1],
          tradingDate: new Date(data[2]),
          best1Bid: Number(data[3]),
          best1BidVolume: Number(data[4]),
          best2Bid: Number(data[5]),
          best2BidVolume: Number(data[6]),
          best3Bid: Number(data[7]),
          best3BidVolume: Number(data[8]),
          best4Bid: Number(data[9]),
          best4BidVolume: Number(data[10]),
          best5Bid: Number(data[11]),
          best5BidVolume: Number(data[12]),
          best6Bid: Number(data[13]),
          best6BidVolume: Number(data[14]),
          best7Bid: Number(data[15]),
          best7BidVolume: Number(data[16]),
          best8Bid: Number(data[17]),
          best8BidVolume: Number(data[18]),
          best9Bid: Number(data[19]),
          best9BidVolume: Number(data[20]),
          best10Bid: Number(data[21]),
          best10BidVolume: Number(data[22]),
          best11Bid: Number(data[23]),
          best11BidVolume: Number(data[24]),
          best12Bid: Number(data[25]),
          best12BidVolume: Number(data[26]),
          best13Bid: Number(data[27]),
          best13BidVolume: Number(data[28]),
          best14Bid: Number(data[29]),
          best14BidVolume: Number(data[30]),
          best15Bid: Number(data[31]),
          best15BidVolume: Number(data[32]),
          best1Offer: Number(data[33]),
          best1OfferVolume: Number(data[34]),
          best2Offer: Number(data[35]),
          best2OfferVolume: Number(data[36]),
          best3Offer: Number(data[37]),
          best3OfferVolume: Number(data[38]),
          best4Offer: Number(data[39]),
          best4OfferVolume: Number(data[40]),
          best5Offer: Number(data[41]),
          best5OfferVolume: Number(data[42]),
          best6Offer: Number(data[43]),
          best6OfferVolume: Number(data[44]),
          best7Offer: Number(data[45]),
          best7OfferVolume: Number(data[46]),
          best8Offer: Number(data[47]),
          best8OfferVolume: Number(data[48]),
          best9Offer: Number(data[49]),
          best9OfferVolume: Number(data[50]),
          best10Offer: Number(data[51]),
          best10OfferVolume: Number(data[52]),
          best11Offer: Number(data[53]),
          best11OfferVolume: Number(data[54]),
          best12Offer: Number(data[55]),
          best12OfferVolume: Number(data[56]),
          best13Offer: Number(data[57]),
          best13OfferVolume: Number(data[58]),
          best14Offer: Number(data[59]),
          best14OfferVolume: Number(data[60]),
          best15Offer: Number(data[61]),
          best15OfferVolume: Number(data[62]),
        });
      }

      return res;
    }

    getQueryParams(key) {
      const urlSearchParams = new URLSearchParams(window.location.search);

      return urlSearchParams.get(key);
    }

    getLanguage() {
      return (
        this.getQueryParams("language") ||
        localStorage.getItem("language") ||
        "vi"
      );
    }

    formatMessageData(channel, data) {
      //heat map - map language
      if (channel.indexOf("HeatMap") > -1) {
        const lang = this.getLanguage();
        switch (lang) {
          case "en":
            data.sectors.forEach((el) => {
              el.name = el.en_Name;
              el.tickers.forEach((t) => {
                t.name = t.en_Name;
              });
            });
            break;
          case "ja":
            data.sectors.forEach((el) => {
              el.name = el.jp_Name;
              el.tickers.forEach((t) => {
                t.name = t.jp_Name;
              });
            });
            break;
          default:
            break;
        }
      }

      switch (channel) {
        case FiinConfig.ChanelConfig.TickChanel:
          return this.formatTickers(data);
        case FiinConfig.ChanelConfig.IndexChannel:
          return this.formatIndexs(data);
        case FiinConfig.ChanelConfig.DerivativeChannel:
          return this.formatDerivatives(data);
        case FiinConfig.ChanelConfig.BidAskChannel:
          return this.formatBidAsk(data);
        case FiinConfig.ChanelConfig.CoveredWarrantChannel:
          return this.formatCW(data);
        default:
          return data;
      }
    }

    preprocessData(chanel, data) {
      if (chanel.indexOf(FiinConfig.ChanelConfig.HeatMapChanelPrefix) >= 0) {
        for (var sector of data.sectors) {
          for (var ticker of sector.tickers) {
            this.subscribe(
              FiinConfig.ChanelConfig.TickChanel + "." + ticker.organCode
            );
          }
        }
      }

      return this.formatMessageData(chanel, data);
    }
  }

  class FiinComponent {
    constructor(el) {
      var me = this;

      var jEl = jQuery(el);
      var comData = jEl.data();
      var comName = comData.component;
      var group = comData.group;
      var params = new URLSearchParams();
      for (var key in comData) {
        params.append(key, comData[key]);
      }

      var iframeTag =
        '<iframe src="' +
        FiinTrade.getComponentUrl(comName, params) +
        '" frameborder=0 allowtransparency="true" scrolling="no" allowfullscreen style="display:block; width: 100%; height: 100%"></iframe>';

      jEl.append(iframeTag);

      me.el = el;
      me.group = group;
      me;
      me.iframe = jQuery(el).children("iframe")[1];

      me.iframe.addEventListener("load", function () {
        document.querySelector("iframe#preIframe").remove();
        console.log(new Date().toLocaleTimeString(), "iframe loaded");
        delete me.channel;

        me.channel = new MessageChannel();

        me.channel.port1.onmessage = me.onMessage;
        me.channel.port1.fiinComponent = me;

        me.sendPort();
      });

      me.channels = [];
    }

    onMessage(e) {
      var me = this;
      var message = e.data;
      switch (message.type) {
        case "get":
          var keypair = FiinTrade.KeyProvider.load();
          fetch(FiinConfig.formatUrl(message.url), {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Fiin-Seed": keypair.XFiinSeed,
              "X-Fiin-Key": keypair.XFiinKey,
              "X-Fiin-User-ID": keypair.XFiinUserId,
            },
          })
            .then((response) => {
              console.log(
                new Date().toLocaleTimeString(),
                `fetch data ${message.url} success`
              );
              var contentType = response.headers.get("content-type");

              if (contentType.indexOf("application/json") !== -1) {
                response.json().then((data) => {
                  data.type = "request";
                  data.envelop = message.url;
                  me.postMessage(data);
                });
              } else {
                var fileName = response.headers
                  .get("content-disposition")
                  .split("filename=")[1]
                  .split(";")[0];
                response.blob().then((blob) => {
                  const downloadUrl = window.URL.createObjectURL(blob);

                  let a = document.createElement("a");
                  if (typeof a.download === "undefined") {
                    window.location.href = downloadUrl;
                  } else {
                    a.href = downloadUrl;
                    a.download = fileName;
                    a.setAttribute("download", `${fileName}`);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }
                });
              }
            })
            .catch((err) => console.log(err));
          break;
        case "post":
          var keypair = FiinTrade.KeyProvider.load();
          fetch(FiinConfig.formatUrl(message.data.url), {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Fiin-Seed": keypair.XFiinSeed,
              "X-Fiin-Key": keypair.XFiinKey,
              "X-Fiin-User-ID": keypair.XFiinUserId,
            },
            method: "POST",
            body: JSON.stringify(message.data.data),
          })
            .then((response) => {
              var contentType = response.headers.get("content-type");

              if (contentType.indexOf("application/json") !== -1) {
                response.json().then((data) => {
                  data.type = "request";
                  data.envelop = message.data.url;
                  me.postMessage(data);
                });
              } else {
                var fileName = response.headers
                  .get("content-disposition")
                  .split("filename=")[1]
                  .split(";")[0];
                response.blob().then((blob) => {
                  const downloadUrl = window.URL.createObjectURL(blob);

                  let a = document.createElement("a");
                  if (typeof a.download === "undefined") {
                    window.location.href = downloadUrl;
                  } else {
                    a.href = downloadUrl;
                    a.download = fileName;
                    a.setAttribute("download", `${fileName}`);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }
                });
              }
            })
            .catch((err) => console.log(err));
          break;
        case "subscribe":
          FiinTrade.signalrMessageHub.subscribe(message.channel);
          me.fiinComponent.registerChannel(message.channel);
          break;
        case "unsubscribe":
          FiinTrade.signalrMessageHub.unsubscribe(message.channel);
          me.fiinComponent.unRegisterChannel(message.channel);
          break;
        default:
          break;
      }
    }

    sendMessage(message) {
      if (this.channel && this.channel.port1) {
        if (this.channels[message.chanel]) {
          this.channel.port1.postMessage({
            type: "subscribe",
            envelop: message.chanel,
            message,
          });
        } else {
          this.channel.port1.postMessage(message);
        }
      }
    }

    sendPort() {
      this.iframe.contentWindow.postMessage({ type: "fiinInit" }, "*", [
        this.channel.port2,
      ]);
    }

    registerChannel(channel) {
      this.channels[channel] = true;
    }

    unRegisterChannel(channel) {
      delete this.channels[channel];
    }

    updateCode(code, type) {
      var jEl = jQuery(this.el);
      var comData = jEl.data();

      if (comData["code"]) {
        comData["code"] = code;
        var comName = comData.component;
        var params = new URLSearchParams();
        for (var key in comData) {
          params.append(key, comData[key]);
        }
        //this.iframe.src = FiinTrade.getComponentUrl(comName, params);
        jEl.data("code", code);
        this.sendMessage({ type: "changeCode", code: code, dataType: type });
      }
    }
  }

  FiinTrade.ComponentList = [];

  FiinTrade.getComponentUrl = function (name, params) {
    return (
      FiinConfig.ENDPOINT_OPTIONS.APP_ENDPOINT +
      FiinConfig.ComponentUrlMap[name] +
      "?" +
      params.toString()
    );
  };

  FiinTrade.addComponent = function (el) {
    if (!FiinTrade.ComponentList.find((com) => com.el === el)) {
      FiinTrade.ComponentList.push(new FiinComponent(el));
    }
  };

  FiinTrade.broadcast = function (message) {
    for (var com of FiinTrade.ComponentList) {
      com.sendMessage(message);
    }
  };

  FiinTrade.init = function (endpointOptions, keyProvider) {
    FiinConfig.ENDPOINT_OPTIONS = {
      ...FiinConfig.ENDPOINT_OPTIONS,
      ...endpointOptions,
    };

    Promise.all([
      typeof jQuery == "undefined"
        ? FiinUtils.loadScript("jquery-3.5.1.slim.min.js")
        : FiinUtils.emptyPromise(),
      loadSignalR
        ? FiinUtils.loadScript("signalr.min.js")
        : FiinUtils.emptyPromise(),
    ]).then(() => {
      var els = jQuery(".fiin-component");

      for (var el of els) {
        FiinTrade.addComponent(el);
      }

      FiinTrade.KeyProvider = keyProvider;

      if (!FiinTrade.signalrMessageHub) {
        FiinTrade.signalrMessageHub = new SignalrMessageHub();
      }
    });
  };

  //type: STOCK, DERIVATIVE, INDEX, CW
  FiinTrade.updateCode = function (code, type, group) {
    for (var com of FiinTrade.ComponentList) {
      if (com.group === group) {
        com.updateCode(code, type);
      }
    }
  };
})(
  typeof jQuery == "undefined",
  typeof signalR == "undefined",
  (window.FiinTrade = window.FiinTrade || {})
);
