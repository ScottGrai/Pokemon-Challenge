import { IReturnEvolutionChain } from "../models/interfaces";
import { queryAndFormatChainLink } from "../evolutionChain";


jest.mock("../evolutionChain", () => ({
  queryAndFormatChainLink: jest.fn()
}))

const mockQueryAndFormatChainLink = queryAndFormatChainLink as jest.Mock;

const originalConsoleError = console.error;
afterEach(() => {
  console.error = originalConsoleError;
});

function testEvolutionChain(name: string): Promise<IReturnEvolutionChain> {
  return queryAndFormatChainLink(name);
}

describe("Pokemon Evolution chain", () => {
  const caterpieExpectedResult = {
    name: "caterpie",
    variations: [{
      name: "metapod",
      variations: [{
        name: "butterfree",
        variations: []
      }]
    }]
  };

  const charmanderExpectedResult = {
    name: "charmander",
    variations: [{
      name: "charmeleon",
      variations: [{
        name: "charizard",
        variations: []
      }]
    }]
  };

  // Test valid results/outputs
  test.each([
    ["caterpie", caterpieExpectedResult],
    ["charmander", charmanderExpectedResult],
    ["butterfree", caterpieExpectedResult],
    ["charmeleon", charmanderExpectedResult]
  ])(
    "should return the expected result for input '%s'",
    async (input: string, expectedResult: IReturnEvolutionChain) => {
      mockQueryAndFormatChainLink.mockResolvedValue(expectedResult);
      const result = await testEvolutionChain(input);
      
      expect(mockQueryAndFormatChainLink).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    }
  )

  // Test invalid result outputs
  test.each([
    ["Invalid pokemon name", "choorizard"],
    ["Invalid pokemon name", "asdf"],
    ["No endpoint or name provided", ""]
  ])(
    "should throw '%s' error for input: '%s'",
    async (errorMessage: string, input: string) => {
      mockQueryAndFormatChainLink.mockRejectedValue(new Error(errorMessage));
      await expect(testEvolutionChain(input)).rejects.toThrow(errorMessage);
    }
  );
});
