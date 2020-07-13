const { getId } = require('./index');

describe('should identify type from input', () => {
  const expectations = [
    {
      pathname: 'iplayer/episode/m000kr71/bbc-news-bbc-news-at-9-10072020',
      html: undefined,
      value: 'm000kr71',
      type: 'PID',
      description: 'match pid in iPlayer path',
      bbcpage: undefined,
    },
    {
      pathname: 'ibroadcast/clip/p01rnpwg',
      html: undefined,
      value: 'p01rnpwg',
      type: 'PID',
      description: 'match pid in iBroadcast 2 path',
      bbcpage: undefined,
    },
    {
      pathname: '/assets/c5r2p3py9kno/editor',
      html: undefined,
      value: 'c5r2p3py9kno',
      type: 'OPTIMO_ID',
      description: 'match OptimoId in optimo path',
      bbcpage: undefined,
    },
    {
      pathname: 'foo/bar',
      html: '<html>"clip_pid": "p01lllhk"</html>',
      value: 'p01lllhk',
      type: 'PID',
      description: 'match pid Castaway html',
      bbcpage: undefined,
    },
    {
      pathname: '/jobs/e39b9f70-b783-11ea-8ff8-b5adc858304e',
      html: '<html>"clip_pid": "p01lllhj"</html>',
      value: 'p01lllhj',
      type: 'PID',
      description: 'match pid in iPlayer path ignoring pid matching string in GUID',
      bbcpage: undefined,
    },
    {
      pathname: '/isite2-xforms/fr/bbcthree/clip/edit/313b9caa-3592-4b2d-8201-a57ba66254e4',
      html: undefined,
      value: 'bbcthree.313b9caa-3592-4b2d-8201-a57ba66254e4',
      type: 'ISITE_ID',
      description: 'match iSite GUID from path',
      bbcpage: undefined,
    },
    {
      pathname: 'topics/cqyxrd44rlvt',
      html: undefined,
      value: 'cqyxrd44rlvt',
      type: 'TOPIC_ID',
      description: 'match topic id from topic page',
      bbcpage: undefined,
    },
    {
      pathname: 'foo',
      html: undefined,
      value: undefined,
      type: undefined,
      description: 'return undefined where no matches found',
      bbcpage: undefined,
    },
    {
      pathname: '/bbcthree/article/237a9696-133c-4c28-a9e3-108c3b9b80d8',
      html: undefined,
      value: undefined,
      type: undefined,
      description: 'return undefined where pid matched in path but not a source of pids',
      bbcpage: undefined,
    },
    {
      pathname: 'entertainment-arts-53387236',
      html: undefined,
      value: '316e1109-6c1b-4003-b120-71c49a942b8d',
      type: 'CPS_ID',
      description: 'return a CPS GUID where the bbcpage object exists and returns a locator',
      bbcpage: { getContentId: jest.fn().mockResolvedValue('urn:bbc:cps:316e1109-6c1b-4003-b120-71c49a942b8d') },
    },
    {
      pathname: 'entertainment-arts-53387236',
      html: undefined,
      value: undefined,
      type: undefined,
      description: 'return return undefined for an unknown locator response from bbcpage',
      bbcpage: { getContentId: jest.fn().mockResolvedValue('someUnknownIdType') },
    },
  ];

  expectations.forEach(({
    pathname, html, value, type, description, bbcpage,
  }) => {
    it(`should ${description}`, async () => {
      const result = await getId(pathname, html, bbcpage);
      expect(result).toEqual({ type, value });
    });
  });
});
