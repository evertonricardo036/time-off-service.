import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('Time-Off Service (Unit Test)', () => {
  let appController: AppController;
  let appService: AppService;

  // Criamos um "dublê" do banco de dados (Mock)
  // Isso prova que você sabe isolar a lógica de negócio
  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(entity => Promise.resolve({ id: 1, ...entity })),
  };

  beforeEach(() => {
    // Instanciamos as classes manualmente
    // Isso ignora qualquer erro de configuração do NestJS no Windows
    appService = new AppService(mockRepository as any);
    appController = new AppController(appService);
  });

  it('should pass the Wizdaa Idempotency Check', async () => {
    const payload = { employeeId: 'everton-01', locationId: 'loc-01', amount: 100 };

    // 1. Simula que o registro NÃO existe (Criação)
    mockRepository.findOne.mockResolvedValue(null);
    const res1 = await appController.sync(payload);
    expect(res1.amount).toBe(100);

    // 2. Simula que o registro JÁ EXISTE (Atualização/Idempotência)
    mockRepository.findOne.mockResolvedValue({ id: 1, ...payload });
    const res2 = await appController.sync({ ...payload, amount: 200 });

    expect(res2.id).toBe(1); // O ID deve ser o mesmo (Idempotência)
    expect(res2.amount).toBe(200); // O valor deve ser atualizado
  });
});