import ChatService from '../../src/api/services/ChatService';
import ChatMessage from '../../src/api/models/ChatMessageModel';

const mockedChatMessage = ChatMessage as jest.MockedClass<typeof ChatMessage>;

describe('ChatService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new chat message correctly', async () => {
    const message = 'Hello, world!';
    const sender = 'User123';

    const result = await ChatService.saveMessage(message, sender);

    expect(ChatMessage).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });

  it('should fetch messages with pagination and return formatted results', async () => {
    const page = 1;
    const itemsPerPage = 10;
    const keyword = 'hello';

    const result = await ChatService.fetchMessages(page, itemsPerPage, keyword);

    expect(mockedChatMessage.find).toHaveBeenCalled();
    expect(result.messages).toHaveLength(1);
    expect(result.totalMessagesCount).toEqual(1);
  });
});
