import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn((id: string, dto) => {
      return {
        id: +id,
        ...dto
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * @description
   * create user controller.
   * method POST
   * /users
   * ({name: string}) => {id: number, name: string}
   */
  it("should create a user", () => {
    const user = {name: "Achu"};
    expect(controller.create(user)).toEqual({
      id: expect.any(Number),
      name: user.name
    })
  })

  it("should update a user", () => {
    const user = {name: "Achu"};
    expect(controller.update('1', user)).toEqual({
      id: 1,
      ...user
    })
  })

});
