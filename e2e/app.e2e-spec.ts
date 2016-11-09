import { Ng2WebsocketPage } from './app.po';

describe('ng2-websocket App', function() {
  let page: Ng2WebsocketPage;

  beforeEach(() => {
    page = new Ng2WebsocketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
