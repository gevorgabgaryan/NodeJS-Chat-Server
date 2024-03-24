jest.mock('../src/api/models/ChatMessageModel', () => {
  const mockSave = jest.fn().mockImplementation(function () {
    return {
      entitize: jest.fn().mockReturnValue({
        _id: 'mockId',
        roomId: 'defaultRoomIdMock',
        sender: 'mockSender',
        message: 'mockMessage',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
  });

  const entitize = jest.fn().mockReturnValue({
    id: 'mockId',
    roomId: 'defaultRoomIdMock',
    sender: 'mockSender',
    message: 'mockMessage',
  });

  const mockInstance = {
    save: mockSave,
    entitize: entitize,
  };

  // Static methods
  const mockStatic = {
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    sort: jest.fn().mockImplementation(() => Promise.resolve([mockInstance])),
    exec: jest.fn().mockResolvedValue([mockInstance]),
    countDocuments: jest.fn().mockResolvedValue(1),
  };

  const mock = jest.fn().mockImplementation(() => mockInstance);
  Object.assign(mock, mockStatic);

  return {
    __esModule: true,
    default: mock,
  };
});

jest.mock('../src/config', () => ({
  JWTSecret: 'secret',
  JWTExpireIn: '1h',
}));
