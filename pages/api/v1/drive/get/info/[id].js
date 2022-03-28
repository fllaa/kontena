import { google } from "googleapis";

export default function handler(req, res) {
  const { id } = req.query;
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
      fields:
        "id, name, mimeType, modifiedTime, createdTime, fileExtension, size",
    },
    (err, resp) => {
      if (err) return res.status(400).json({ error: err });
      res.status(200).json(resp.data);
    }
  );
}
