import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 12:00 AM for 00:00', () => {
    let time = pipe.transform('00:00');
    expect(time).toBe('12:00 AM');
  });

  it('should return 8:00 AM for 08:00', () => {
    let time = pipe.transform('08:00');
    expect(time).toBe('8:00 AM');
  });

  it('should return 10:00 PM for 22:00', () => {
    let time = pipe.transform('22:00');
    expect(time).toBe('10:00 PM');
  });

  it('should return 12:30 PM for 12:30', () => {
    let time = pipe.transform('12:30');
    expect(time).toBe('12:30 PM');
  });

});