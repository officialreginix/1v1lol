window.InitRV = function InitRV(id = 'Guest') {
  $.getScript('https://static.ultra-rv.com/rv-min.js', function() {
    const ironRV = IronRV.getInstance({
      applicationKey: '1-mb5whk',
      applicationUserId: id,
    });

    const eventHandlers = {
      [IronRV.EVENTS.READY]: () => {
        gameInstance.SendMessage('MainMenuManagers', 'RvReady');
      },
      [IronRV.EVENTS.CLOSE]: () => {
        gameInstance.SendMessage('MainMenuManagers', 'RvWatchComplete', 'false');
      },
      [IronRV.EVENTS.COMPLETION]: () => {
        gameInstance.SendMessage('MainMenuManagers', 'RvWatchComplete', 'true');
      },
      [IronRV.EVENTS.AD_BLOCK]: () => {
        ironRV.showAdBlockMessage();
      },
      [IronRV.EVENTS.INIT_ERROR]: () => {
        // Handle initialization error
      },
    };

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      ironRV.addListener(event, handler);
    });

    window.showRV = () => {
      ironRV.show();
    };
  });
};
