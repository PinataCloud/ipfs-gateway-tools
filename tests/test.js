import IpfsGatewayTools from "../src/index";
const ipfsGatewayTools = new IpfsGatewayTools();

describe("containsCID function testing", () => {
  test("throws if url is not a string", () => {
    expect(() => {
      ipfsGatewayTools.containsCID(4);
    }).toThrow("url is not string");
  });
  test("returns false if no CID", () => {
    const results = ipfsGatewayTools.containsCID("ipfs://asdflksjfslkd");
    expect(results).toEqual({
      containsCid: false,
      cid: null,
    });
  });
  test("returns true if CID", () => {
    const CIDToLookFor = "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o";
    const expectedResult = {
      containsCid: true,
      cid: CIDToLookFor,
    };
    expect(ipfsGatewayTools.containsCID(`ipfs://${CIDToLookFor}`)).toEqual(
      expectedResult
    );

    expect(
      ipfsGatewayTools.containsCID(
        `https://ipfs.io/ipfs/${CIDToLookFor}?filename=IMG_20210917_135500_HDR`
      )
    ).toEqual(expectedResult);
  });
  test("returns true if base32 CID", () => {
    const CIDToLookFor = "bafybeigeweglu3c2hgyuobwuhugxzp3xgea5fdtht4yg4e4mcdfz3hx7hy";
    const expectedResult = {
      containsCid: true,
      cid: CIDToLookFor,
    };
    expect(ipfsGatewayTools.containsCID(`ipfs://${CIDToLookFor}`)).toEqual(
      expectedResult
    );

    expect(
      ipfsGatewayTools.containsCID(
        `https://ipfs.io/ipfs/${CIDToLookFor}?filename=IMG_20210917_135500_HDR`
      )
    ).toEqual(expectedResult);
  });
});

describe("convertToDesiredGateway function testing", () => {
  const desiredGatewayPrefix = "https://gateway.pinata.cloud";
  const theCID = "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o";

  const base32CID = "bafybeigeweglu3c2hgyuobwuhugxzp3xgea5fdtht4yg4e4mcdfz3hx7hy";
  test("throws if url does not contain a CID", () => {
    expect(() => {
      ipfsGatewayTools.convertToDesiredGateway(`ipfs://testing`);
    }).toThrow("url does not contain CID");
  });
  test("throws if url does not follow normal format", () => {
    expect(() => {
      ipfsGatewayTools.convertToDesiredGateway(
        `https://testurl.com/testing/${theCID}`
      );
    }).toThrow(
      "unsupported URL pattern, please submit a github issue with the URL utilized"
    );
  });
  test("correctly returns simple path", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `ipfs://${theCID}`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipfs/${theCID}`);
  });
  test("test with full url", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `https://ipfs.io/ipfs/${theCID}`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipfs/${theCID}`);
  });
  test("test with full ipns url", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `https://ipfs.io/ipns/${theCID}`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipns/${theCID}`);
  });
  test("correctly returns path with content after CID (a directory path)", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `ipfs://${theCID}/test.json`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipfs/${theCID}/test.json`);
  });
  test("correctly returns subdomain style path", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `https://${base32CID}.ipfs.dweb.link`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipfs/${base32CID}`);
  });
  test("correctly returns subdomain style path with directory path", () => {
    const results = ipfsGatewayTools.convertToDesiredGateway(
      `https://${base32CID}.ipfs.dweb.link/test.json`,
      desiredGatewayPrefix
    );
    expect(results).toEqual(`${desiredGatewayPrefix}/ipfs/${base32CID}/test.json`);
  });
});
