import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import MainRepo from '../src/MainRepo';
import data from '../src/data-sample';
import domUpdates from '../src/domUpdates';
chai.spy.on(domUpdates, 'domSearchCustomerName', () => true);
chai.spy.on(domUpdates, 'domRoomsAvailable', () => true);

describe('MainRepo', function() {

  let mainRepo;
  beforeEach(function() {
    mainRepo = new MainRepo(data, '01/06/2019');
  })

  it('should be a function', function() {
    expect(MainRepo).to.be.a('function');
  });

  it('should be an instace of CustomerRepo', function() {
    expect(mainRepo).to.be.an.instanceOf(MainRepo);
  });

  it('returnCustomerName should return customers name using customer object', function() {
    expect(mainRepo.returnCustomerName(data.users[4])).to.equal('Reginald Schaden');
  });

  it('addNewCustomer should add new customer to custermrsData', function() {
    expect(mainRepo.currentID).to.equal(31);
    mainRepo.addNewCustomer('Andreea');
    expect(mainRepo.currentID).to.equal(32);
    mainRepo.addNewCustomer('David');
    expect(mainRepo.currentID).to.equal(33);
    expect(mainRepo.data.users[31]).to.eql({id: 32, name: 'David'});
  });

  it('searchCustomerName should return available rooms', function() {
    expect(mainRepo.searchCustomerName('al')).to.eql([
      { id: 5, name: 'Reginald Schaden' },
      { id: 17, name: 'Kianna Walter' }
    ]);
  });

  it('roomsAvailable should return number of rooms available', function() {
    expect(mainRepo.roomsAvailable('')).to.eql({ total: 198,
      'residential suite': 45,
      'single room': 65,
      'junior suite': 38,
      suite: 50 });
  });
});