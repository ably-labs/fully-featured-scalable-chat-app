export interface AblyReactorMessage {
    id: string;
    clientId: string;
    connectionId: string;
    timestamp: number;
    encoding: "json" | "msgpack";
    data: string | object;
    name: string;
}

export interface AblyReactorEnvelope {
    source: string;
    appId: string;
    channel: string;
    site: string;
    ruleId: string;
    messages: AblyReactorMessage[];
}

/* const example = {
    source: 'channel.message',
    appId: 'xv_W-A',
    channel: 'global-welcome',
    site: 'eu-west-1-A',
    ruleId: 'blTyQg',
    messages: [
      {
        id: 'vpjj8WHWcJ:1:0',
        clientId: '2d5620b2-c2b7-4e5e-8f86-1b3458785ce9',
        connectionId: 'vpjj8WHWcJ',
        timestamp: 1642959945685,
        encoding: 'json',
        data: '{"text":"hjkghjg"}',
        name: 'message'
      }
    ]
  }*/