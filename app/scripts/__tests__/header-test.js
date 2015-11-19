// __tests__/header-test.js

jest.dontMock('../components/header');
jest.dontMock('../../../test-utils/stubRouterContext');

var React = require('react/addons');
var Header = require('../components/header');

var StubRouterContext = require('../../../test-utils/stubRouterContext');

var TestUtils = React.addons.TestUtils;

describe('header', function() {

  it('displays two nav items with right text content', function() {

    var HeaderWithRouterContext = StubRouterContext(Header),
      header = TestUtils.renderIntoDocument(<HeaderWithRouterContext />);
      renderedItems = TestUtils.scryRenderedDOMComponentsWithTag(header, 'a'),
      itemCount = renderedItems.length;

    expect(itemCount).toBe(2);

    expect(React.findDOMNode(renderedItems[0]).textContent).toEqual('Home');
    expect(React.findDOMNode(renderedItems[1]).textContent).toEqual('Info');
  });

});