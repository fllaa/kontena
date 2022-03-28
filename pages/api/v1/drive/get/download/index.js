import { google } from "googleapis";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);
const down = async (req, res) => await pipeline(req, res);

export default async function handler(req, res) {
  const { id, name, mimeType } = req.query;
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = process.env;
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  drive.files.get(
    {
      fileId: id,
      supportsAllDrives: true,
      alt: "media",
    },
    (err, resp) => {
      if (err) return res.status(400).json({ error: err });
      // set headers
      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
      // pipe the response to the response
      down(resp.data, res);
    }
  );
}
