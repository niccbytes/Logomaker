// main.test.js

const { getUserInput, generateSVG } = require('./main');

describe('getUserInput', () => {
  it('should get user input', async () => {
    const mockInput = ['A', 'red', 'circle', 'blue'];
    const mockQuestion = jest.fn();
    mockQuestion.mockResolvedValueOnce(mockInput[0]);
    mockQuestion.mockResolvedValueOnce(mockInput[1]);
    mockQuestion.mockResolvedValueOnce(mockInput[2]);
    mockQuestion.mockResolvedValueOnce(mockInput[3]);

    const mockCreateInterface = jest.fn();
    mockCreateInterface.mockReturnValue({
      question: mockQuestion,
      close: jest.fn()
    });

    const readline = require('readline');
    readline.createInterface = mockCreateInterface;

    const input = await getUserInput();
    
    expect(input).toEqual({
      text: mockInput[0],
      textColor: mockInput[1],
      shape: mockInput[2],
      shapeColor: mockInput[3]
    });

    expect(mockCreateInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout
    });
    expect(mockQuestion).toHaveBeenCalledWith("Enter up to three characters: ", expect.any(Function));
    expect(mockQuestion).toHaveBeenCalledWith("Enter text color: ", expect.any(Function));
    expect(mockQuestion).toHaveBeenCalledWith("Choose a shape (circle, triangle, square): ", expect.any(Function));
    expect(mockQuestion).toHaveBeenCalledWith("Enter shape color: ", expect.any(Function));
  });
});

describe('generateSVG', () => {
  it('should generate SVG based on user input', () => {
    const input = {
      text: 'ABC',
      textColor: 'red',
      shape: 'circle',
      shapeColor: 'blue'
    };

    const draw = {
      rect: jest.fn(),
      text: jest.fn(),
      fill: jest.fn(),
      move: jest.fn()
    };
    
    draw.rect.mockReturnValue({ fill: draw.fill });
    draw.text.mockReturnValue({ fill: draw.fill });

    const SVG = jest.fn().mockReturnValue({
      size: jest.fn().mockReturnValue(draw)
    });

    const originalSvg = global.SVG;
    global.SVG = SVG;
    
    generateSVG(input);

    expect(SVG).toHaveBeenCalledWith('logo');
    expect(SVG('logo').size).toHaveBeenCalledWith(300, 200);
    expect(draw.rect).toHaveBeenCalledWith(100, 100);
    expect(draw.fill).toHaveBeenCalledWith('blue');
    expect(draw.text).toHaveBeenCalledWith('ABC');
    expect(draw.fill).toHaveBeenCalledWith('red');
    expect(draw.move).toHaveBeenCalledWith(50, 50);

    global.SVG = originalSvg;
  });
});
