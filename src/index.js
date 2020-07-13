const OPTIMO_ID = 'OPTIMO_ID';
const TOPIC_ID = 'TOPIC_ID';
const PID = 'PID';
const ISITE_ID = 'ISITE_ID';
const CPS_ID = 'CPS_ID';

exports.getId = async (path, html, bbcpage) => {
  const pidRegex = '[bcdlnmprtw][0-9|b-d|f-h|j-n|p-t|v-z]{7,14}';
  const shortIdRegex = /([a-z])[\w]{10,}([a-z])/;
  const guidRegex = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

  const pidPathMatches = path.match(new RegExp(pidRegex));
  const shortIdPathMatches = path.match(shortIdRegex);
  const guidInPathMatches = path.match(new RegExp(guidRegex));
  const pidDocumentMatches = new RegExp(`clip_pid": ?"(${pidRegex})"`).exec(
    html,
  );
  const iSiteGuidPathMatches = path.match(
    new RegExp(`isite2-xforms/fr/([^/]+)/.*(${guidRegex})`),
  );

  return new Promise(async (resolve, reject) => {
    if (shortIdPathMatches) {
      const isTopicId = shortIdPathMatches[1] === 'c' && shortIdPathMatches[2] === 't';
      const isOptimoId = shortIdPathMatches[1] === 'c' && shortIdPathMatches[2] === 'o';
      if (isTopicId) {
        resolve({
          type: TOPIC_ID,
          value: shortIdPathMatches[0],
        });
      }
      if (isOptimoId) {
        resolve({
          type: OPTIMO_ID,
          value: shortIdPathMatches[0],
        });
      }
    }
    if (pidPathMatches) {
      const pidMatchedInPathGuid = pidPathMatches && guidInPathMatches;
      if (!pidMatchedInPathGuid) {
        const [pid] = pidPathMatches;
        resolve({
          type: PID,
          value: pid,
        });
      }
    }
    if (pidDocumentMatches) {
      const [, pid] = pidDocumentMatches;
      resolve({
        type: PID,
        value: pid,
      });
    }

    if (iSiteGuidPathMatches) {
      resolve({
        type: ISITE_ID,
        value: `${iSiteGuidPathMatches[1]}.${iSiteGuidPathMatches[2]}`,
      });
    }
    if (typeof bbcpage !== 'undefined') {
      try {
        const contentId = await bbcpage.getContentId();
        if (contentId.indexOf(':') !== -1) {
          const cpsLocatorMatches = contentId.match(
            new RegExp(`^urn:bbc:cps:(${guidRegex})`),
          );
          if (cpsLocatorMatches) {
            resolve({
              type: CPS_ID,
              value: cpsLocatorMatches[1],
            });
          }
        } else {
          resolve({
            type: undefined,
            value: undefined,
          });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    } else {
      resolve({
        type: undefined,
        value: undefined,
      });
    }
  });
};
