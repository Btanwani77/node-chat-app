const expect = require('expect');
const {generateMessage} = require('./message');

describe('Generate Message',() => {
  it('Should Generate the Correct Message Object',() => {
    var from = 'Jayant';
    var text = "Some Message";
    var message = generateMessage(from,text);
    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      text,
    });
    
  });
});
