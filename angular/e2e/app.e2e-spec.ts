import { NCSAngularTemplatePage } from './app.po';

describe('abp-project-name-template App', function() {
  let page: NCSAngularTemplatePage;

  beforeEach(() => {
    page = new NCSAngularTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
