import { MinesweeperPage } from './app.po';

describe('minesweeper App', () => {
  let page: MinesweeperPage;

  beforeEach(() => {
    page = new MinesweeperPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
